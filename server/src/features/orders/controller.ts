import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Route,
    SuccessResponse,
    Tags,
  } from "tsoa";
  import { Order, ProductOrder } from "@prisma/client";
  import { OrderService } from "./services";
import { OrderCreationParams } from "./model";

  @Route("orders")
  @Tags("Orders")
  export class OrdersController extends Controller {
    @Get()
    public async getOrders(): Promise<Order[]> {
        return new OrderService().getAll();
    }
    @Get("{orderId}")
  public async getOrder(@Path() orderId: number): Promise<Order|null> {
    return new OrderService().get(orderId);
  }
    @SuccessResponse("201", "Order created")
    @Post()
    public async createOrder(
        @Body() requestBody: OrderCreationParams
    ): Promise<ProductOrder> {
        this.setStatus(201);
        return new OrderService().register(requestBody);
    }
  }