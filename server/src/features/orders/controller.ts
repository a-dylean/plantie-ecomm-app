import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { Order, ProductOrder } from "@prisma/client";
import { OrderService } from "./services";
import { OrderCreationParams, ProductOrderCreationParams } from "./model";

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
  @Security("jwt")
  @Get("/draft/{user_id}")
  public async getOrderByUserId(
    @Path() user_id: number
  ): Promise<Order | null> {
    return new OrderService().getOrderByUserId(user_id);
  }

  /**
   * Returns user's cart (list of cart items) provided the order ID.
   */
  @Security("jwt")
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
  @Security("jwt")
  @SuccessResponse("201", "Order created")
  @Post()
  public async createOrder(
    @Body() requestBody: OrderCreationParams
  ): Promise<Order | undefined> {
    this.setStatus(201);
    return new OrderService().createOrder(requestBody);
  }
  @Security("jwt")
  @Put("/pay/{order_id}")
  public async pay(
    @Path() order_id: number,
    @Body() requestBody: {amount: Order['amount']}
  ): Promise<Order> {
    return new OrderService().paymentRecieved(order_id, requestBody.amount);
  }
}

@Route("product_orders")
@Tags("ProductOrders")
export class ProductOrdersController extends Controller {
  /**
   * Returns a ProductOrder provided the product ID.
   */
  @Security("jwt")
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
  @Security("jwt")
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
  @Security("jwt")
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
  @Security("jwt")
  @Delete("/{productOrderId}")
  public async deleteProductOrderById(
    @Path() productOrderId: number
  ): Promise<void> {
    return new OrderService().deleteProductOrderById(productOrderId);
  }
}
