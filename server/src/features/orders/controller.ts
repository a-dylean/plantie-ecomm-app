import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { Order, ProductOrder } from "@prisma/client";
import { OrderService } from "./services";
import { OrderCreationParams, ProductOrderCreationParams } from "./model";
import Stripe from "stripe";
import { STRIPE_SK } from "../../../config";
const stripe = new Stripe(STRIPE_SK, {
  apiVersion: "2022-11-15",
  typescript: true,
});
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
  @Get("/draft/{user_id}")
  public async getOrderByUserId(
    @Path() user_id: number
  ): Promise<Order | null> {
    return new OrderService().getOrderByUserId(user_id);
  }
  /**
   * Returns user's cart (list of cart items) provided the order ID.
   */
  @Get("/{orderId}/product_orders")
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

@Route("product_orders")
@Tags("ProductOrders")
export class ProductOrdersController extends Controller {
  /**
   * Returns a ProductOrder provided the product ID.
   */
  @Get("/{productId}")
  public async getProductOrderByProductId(
    @Path() productId: number
  ): Promise<ProductOrder | null> {
    return new OrderService().getProductOrderByProductId(productId);
  }
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
    @Body() requestBody: ProductOrder[]
  ): Promise<void> {
    const line_items = requestBody.map((item: any) => {
      console.log(requestBody);
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.productId,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items,
        success_url: `http://localhost:3000/successfull`,
        cancel_url: `http://localhost:3000/cancelled`,
      });
      req.res?.json({ url: session.url });
    } catch (e: any) {
      req.res?.status(500).json({ error: e.message });
    }
  }
}
