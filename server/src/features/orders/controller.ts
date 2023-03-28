import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { Order, ProductOrder } from "@prisma/client";
import { OrderService } from "./services";
import { OrderCreationParams } from "./model";

@Route("orders")
@Tags("Orders")
export class OrdersController extends Controller {
  /**
   * Retrieves a list of all orders in the system.
   * @returns List of orders
   */
  @Security("jwt", ["admin"])
  @Get()
  public async getOrders(): Promise<Order[]> {
    return new OrderService().getAll();
  }
  /**
   * Retrieves the detailes of a particular order provided the unique product ID.
   * @param orderId Identifier of the order
   * @returns Order
   */
  @Security("jwt")
  @Get("{orderId}")
  public async getOrder(@Path() orderId: number): Promise<Order | null> {
    return new OrderService().get(orderId);
  }
  /**
   * Creates a new order in the system.
   * @param requestBody Details of the order
   */
  @Security("jwt")
  @SuccessResponse("201", "Order created")
  @Post()
  public async createOrder(
    @Body() requestBody: OrderCreationParams
  ): Promise<ProductOrder> {
    this.setStatus(201);
    return new OrderService().create(requestBody);
  }
}
