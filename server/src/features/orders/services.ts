import { Order, ProductOrder } from "@prisma/client";
import { OrderCreationParams, OrderModel } from "./model";
import { NotFoundError } from "../../helpers/errors";
const OrderModelInstance = new OrderModel();

export class OrderService {
  async get(id: Order["id"]): Promise<Order | null> {
    const order = await OrderModelInstance.findOrderById(id);
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    return order;
  }
  async getAll(): Promise<Order[]> {
    return await OrderModelInstance.getAll();
  }
  async register(data: OrderCreationParams): Promise<ProductOrder> {
    return await OrderModelInstance.create(data);
  }
}
