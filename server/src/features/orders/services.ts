import { Order, ProductOrder } from "@prisma/client";
import createError from "http-errors";
import {OrderCreationParams, OrderModel } from "./model";

const OrderModelInstance = new OrderModel();

export class OrderService {
  async get(id: Order["id"]): Promise<Order|null> {
    try {
      const order = await OrderModelInstance.findOrderById(id);
      if (!order) {
        throw createError(404, "Order not found!");
      }
      return order;
    } catch (err) {
      throw err;
    }
  }
  async getAll(): Promise<Order[]> {
    try {
      return await OrderModelInstance.getAll();
    } catch (err) {
      throw err;
    }
  }
  async register(data: OrderCreationParams): Promise<ProductOrder> {
    try {
      return await OrderModelInstance.create(data);
    } catch (err) {
      throw createError(500);
    }
  }
};