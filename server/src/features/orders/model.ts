import { Order, PrismaClient, ProductOrder } from "@prisma/client";
const prisma = new PrismaClient();

export class OrderModel {
  async create(data: ProductOrder): Promise<ProductOrder> {
    return await prisma.productOrder.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
        orderId: data.orderId,
      },
    });
  }
  async getAll(): Promise<Order[]> {
    return await prisma.order.findMany();
  }
  async findOrderById(id: Order["id"]): Promise<Order|null> {
    return await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
  }
}
