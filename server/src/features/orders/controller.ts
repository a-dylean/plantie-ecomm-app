import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Query,
  Request,
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
  @Post("/product_order")
  public async createProductOrder(
    @Body() requestBody: ProductOrderCreationParams
  ): Promise<ProductOrder|undefined> {
    this.setStatus(201);
    return new OrderService().createProductOrder(requestBody);
  }

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
  @Get("/draft/{draft_order}")
  public async getOrderByUserId(
    @Path() draft_order: number
  ): Promise<Order | null> {
    return new OrderService().getOrderByUserId(draft_order);
  }

  @Security("jwt")
  @Get("/product_order/order/{order_id}")
  public async getProductOrderPerOrder(
    @Path() order_id: number
  ): Promise<ProductOrder[]|null> {
    return new OrderService().getProductOrderPerOrder(order_id);
  }

  @Security("jwt")
  @Get("/product_order/item/{product_id}")
  public async getProductOrderByProductId(
    @Path() product_id: number
  ): Promise<ProductOrder|null> {
    return new OrderService().getProductOrderByProductId(product_id);
  }

  @Security("jwt")
  @Delete("/product_order/delete/{productOrderId}")
  public async deleteProductOrderById(
    @Path() productOrderId: number
  ): Promise<void> {
    return new OrderService().deleteProductOrderById(productOrderId);
  }

  @Security("jwt")
  @Post("/increment/{productOrderId}")
  public async incrementProductOrder(
    @Path() productOrderId: number
  ): Promise<ProductOrder|null> {
    return new OrderService().incrementProductOrderItem(productOrderId);
  }

  @Security("jwt")
  @Post("/decrement/{productOrderId}")
  public async decrementProductOrder(
    @Path() productOrderId: number
  ): Promise<ProductOrder|null> {
    return new OrderService().decrementProductOrderItem(productOrderId);
  }


}
