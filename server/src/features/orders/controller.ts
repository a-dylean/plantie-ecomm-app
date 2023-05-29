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
import express, { Response as ExResponse, Request as ExRequest } from "express";
import { Order, PrismaClient, ProductOrder } from "@prisma/client";
import { OrderService } from "./services";
import { OrderCreationParams, ProductOrderCreationParams } from "./model";
import Stripe from "stripe";
import { ENDPOINT_SECRET, STRIPE_SK } from "../../../config";
import { ProductService } from "../products/services";
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

@Route("create-checkout-session")
@Tags("Orders")
export class PaymentController extends Controller {
  @Security("jwt")
  @Post()
  public async createCheckoutSession(
    @Request() req: ExRequest,
    @Body() requestBody: CheckoutInfo
  ): Promise<void> {
    const productOrders = requestBody.order;
    const items = productOrders.map(async (item: ProductOrder) => {
      const product = await new ProductService().get(Number(item.productId))
        return ({
            price_data: {
              currency: "eur",
              product_data: {
                name: product.name,
              },
              unit_amount: Number(product.price) * 100,
            },
            quantity: item.quantity,
          });
      })
      const line_items = await Promise.all(items)
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: requestBody.userEmail,
        line_items: line_items,
        success_url: `http://localhost:3000/successfull`,
        cancel_url: `http://localhost:3000/cancelled`,
      });
      req.res?.json({ url: session.url });
    } catch (e: any) {
      req.res?.status(500).json({ error: e.message });
    }
  }
}
const prisma = new PrismaClient();
const endpointSecret = ENDPOINT_SECRET;

@Route("/webhook")
@Tags("Orders")
export class WebhookController extends Controller {
  @Post()
  public async createWebhook(@Request() req: ExRequest): Promise<void> {
    let event = req.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body.text(),
          signature!,
          endpointSecret
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
      }
    }
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        //Then define and call a function to handle the event checkout.session.completed
        const user = await prisma.user.findUnique({
          where: {
            email: event.data.object.customer_details.email,
          },
        });

        const prismaOrder = await prisma.order.findFirst({
          where: {
            userId: user!.id,
          },
          orderBy: {
            id: "desc",
          },
        });

        await prisma.order.update({
          where: {
            id: prismaOrder!.id,
          },
          data: {
            status: "Payment Received",
            amount: event.data.object.amount_total / 100,
          },
        });
        console.log(checkoutSessionCompleted);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    req.res?.send();
  }
}
