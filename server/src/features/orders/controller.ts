import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { Request as ExRequest } from "express";
import { Order, ProductOrder } from "@prisma/client";
import { OrderService } from "./services";
import { OrderCreationParams, ProductOrderCreationParams } from "./model";
import Stripe from "stripe";
import {
  STRIPE_SK,
  adjustable_quantity_max,
  allowed_countries,
  business_day,
  currency,
  delivery_estimate_nextday_free_delivery_max,
  delivery_estimate_nextday_free_delivery_min,
  delivery_estimate_nextday_shipping_max,
  delivery_estimate_nextday_shipping_min,
  freeShipping,
  nextdayShipping,
  shipping_rate_fixed_amount_free_delivery,
  shipping_rate_fixed_amount_nextday_shipping,
  shipping_rate_type,
} from "../../../config";
import { ProductService } from "../products/services";
import { UserService } from "../users/services";
import { getStripeValue, getValueFromStripe } from "../../helpers/stripe";
export const stripe = new Stripe(STRIPE_SK, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export interface CheckoutInfo {
  order: ProductOrder[];
  userEmail: string;
}

@Route("orders")
@Tags("Orders")
export class OrdersController extends Controller {
  /**
   * Retrieves a list of all orders in the system for the particular user.
   * @returns List of orders
   */
  @Security("jwt")
  @Get("/{userId}")
  public async getOrders(@Path() userId: number): Promise<Order[]> {
    return new OrderService().getAll(userId);
  }
  /**
   * Retrieves the detailes of a particular order provided the unique order ID.
   * @param orderId Identifier of the order
   * @returns Order
   */
  @Security("jwt")
  @Get("{orderId}")
  public async getOrder(@Path() orderId: number): Promise<Order | null> {
    return new OrderService().get(orderId);
  }
  /**
   * Returns draft order provided the unique user ID.
   */
  @Get("/draft/{userId}")
  public async getOrderByUserId(@Path() userId: number): Promise<Order | null> {
    return new OrderService().getOrderByUserId(userId);
  }
  /**
   * Returns user's cart (list of cart items) provided the order ID.
   */
  @Get("/{orderId}/product-orders")
  public async getCart(
    @Path() orderId: number
  ): Promise<ProductOrder[] | null> {
    return new OrderService().getCart(orderId);
  }
  /**
   * Creates a new draft order in the system.
   * @param requestBody Details of the order
   */
  @SuccessResponse("201", "Order created")
  @Post()
  public async createOrder(
    @Body() requestBody: OrderCreationParams
  ): Promise<Order | undefined> {
    this.setStatus(201);
    return new OrderService().createOrder(requestBody);
  }
}

@Route("product-orders")
@Tags("ProductOrders")
export class ProductOrdersController extends Controller {
  /**
   * Creates a new ProductOrder in the system.
   * @param requestBody Details of the order
   */
  @Post()
  public async createProductOrder(
    @Body() requestBody: ProductOrderCreationParams
  ): Promise<ProductOrder | undefined> {
    this.setStatus(201);
    return new OrderService().createProductOrder(requestBody);
  }
  /**
   * Updates ProductOrder quantity provided the unique ProductOrder ID.
   */
  @Put("/{productOrderId}")
  public async updateQuantity(
    @Path() productOrderId: number,
    @Body() requestBody: { quantity: number }
  ): Promise<ProductOrder | null> {
    return new OrderService().updateQuantity(
      productOrderId,
      requestBody.quantity
    );
  }
  /**
   * Deletes cart item from the cart provided the unique cart item ID.
   */
  @Delete("/{productOrderId}")
  public async deleteProductOrderById(
    @Path() productOrderId: number
  ): Promise<void> {
    return new OrderService().deleteProductOrderById(productOrderId);
  }
}

@Route("stripe")
@Tags("Stripe")
export class PaymentController extends Controller {
  @Security("jwt")
  /**
   * Creates Stripe checkout session.
   */
  @Post("/create-checkout-session")
  public async createCheckoutSession(
    @Request() req: ExRequest,
    @Body() requestBody: CheckoutInfo
  ): Promise<void> {
    const productOrders = requestBody.order;
    const items = productOrders.map(async (item: ProductOrder) => {
      const product = await new ProductService().get(Number(item.productId));
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: product.name,
            images: [product.picture!],
          },
          unit_amount: getStripeValue(product.price),
        },
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          maximum: adjustable_quantity_max,
        },
      };
    });
    const line_items = await Promise.all(items);
    const user = await new UserService().getUserByEmail(requestBody.userEmail);
    try {
      const session = await stripe.checkout.sessions.create({
        customer: user.stripeId?.toString(),
        mode: "payment",
        line_items: line_items,
        success_url: `http://localhost:3000/successfull`,
        cancel_url: `http://localhost:3000/cancelled`,
        shipping_address_collection: {
          allowed_countries: [allowed_countries],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: shipping_rate_type,
              fixed_amount: {
                amount: shipping_rate_fixed_amount_free_delivery,
                currency: currency,
              },
              display_name: freeShipping,
              delivery_estimate: {
                minimum: {
                  unit: business_day,
                  value: delivery_estimate_nextday_free_delivery_min,
                },
                maximum: {
                  unit: business_day,
                  value: delivery_estimate_nextday_free_delivery_max,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: shipping_rate_type,
              fixed_amount: {
                amount: shipping_rate_fixed_amount_nextday_shipping,
                currency: currency,
              },
              display_name: nextdayShipping,
              delivery_estimate: {
                minimum: {
                  unit: business_day,
                  value: delivery_estimate_nextday_shipping_min,
                },
                maximum: {
                  unit: business_day,
                  value: delivery_estimate_nextday_shipping_max,
                },
              },
            },
          },
        ],
        metadata: {
          userId: user.id,
        },
      });
      req.res?.json({ url: session.url });
    } catch (e: any) {
      req.res?.status(500).json({ error: e.message });
    }
  }
  /**
   * Creates Stripe webhook to update database is the checkout session was successfull.
   */
  @Post("/webhook")
  public async createWebhook(@Request() req: ExRequest): Promise<void> {
    let event = req.body;
    const metadata = event.data.object;
    switch (event.type) {
      case "checkout.session.completed":
        const prismaOrder = await new OrderService().getOrderByUserId(
          parseInt(metadata.metadata.userId)
        );
        await new OrderService().paymentRecieved(
          prismaOrder!.id,
          getValueFromStripe(metadata.amount_total)
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    req.res?.send();
  }
}
