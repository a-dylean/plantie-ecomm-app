import { Order, PrismaClient, ProductOrder } from "@prisma/client";
const prisma = new PrismaClient();

export type OrderCreationParams = Pick<
  ProductOrder,
  "productId" | "quantity" | "orderId"
>;
export class OrderModel {
  async create(data: OrderCreationParams): Promise<ProductOrder> {
    return await prisma.productOrder.create({
      data: {
        ...data
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
