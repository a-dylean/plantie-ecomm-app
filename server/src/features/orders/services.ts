import { Order, Product, ProductOrder, User } from "@prisma/client";
import { ProductOrderCreationParams, OrderModel, OrderCreationParams } from "./model";
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
  async createProductOrder(data: ProductOrderCreationParams): Promise<ProductOrder|undefined> {
    return await OrderModelInstance.createProductOrder(data);
  }
  async createOrder(data: OrderCreationParams): Promise<Order | undefined> {
    return await OrderModelInstance.createOrder(data);
  }
  async getOrderByUserId(id: User["id"]): Promise<Order | null> {
    return await OrderModelInstance.findDraftOrderByUserId(id);
  }
  async getProductOrderPerOrder(id: Order["id"]): Promise<ProductOrder[]|null> {
    return await OrderModelInstance.findProductOrderPerOrder(id);
  }
  async getProductOrderByProductId(id: Product["id"]): Promise<ProductOrder|null> {
    return await OrderModelInstance.findProductOrderByProductId(id);
  }
  async deleteProductOrderById(id: Product["id"]): Promise<void> {
    return await OrderModelInstance.deleteProductOrderById(id);
  }
  async incrementProductOrderItem(id: ProductOrder["id"]): Promise<ProductOrder|null> {
    return await OrderModelInstance.incrementProductOrderItem(id);
  }
  async decrementProductOrderItem(id: ProductOrder["id"]): Promise<ProductOrder|null> {
    return await OrderModelInstance.decrementProductOrderItem(id);
  }
}
