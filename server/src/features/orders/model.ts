import { Order, PrismaClient, Product, ProductOrder, User } from "@prisma/client";
const prisma = new PrismaClient();

export type ProductOrderCreationParams = Pick<
  ProductOrder,
  "productId" | "quantity" | "orderId"
>;

export type OrderCreationParams = Pick<Order, "userId">;

export class OrderModel {
  async createProductOrder(
    data: ProductOrderCreationParams
  ): Promise<ProductOrder> {
    return await prisma.productOrder.create({
      data: {
        ...data,
      },
    });
  }
  async createOrder(data: OrderCreationParams): Promise<Order | undefined> {
    //check if draft order exists for a user
    const userId = data.userId;
    const draftOrder = await prisma.order.findMany({
      where: {
        userId: userId,
        status: "draft",
      },
    });
    if (draftOrder.length === 0) {
      return await prisma.order.create({
      data: {
        ...data,
      },
    });
    }
    //return; 
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
  async findDraftOrderByUserId(id: User["id"]): Promise<Order|null> {
    return await prisma.order.findFirst({
      where: {
        userId: id,
      },
      orderBy: {
        id: "desc"
      }
    });
  }
  async findProductOrderPerOrder(id: Order["id"]): Promise<ProductOrder[]|null> {
    return await prisma.productOrder.findMany({
      where: {
        orderId: id
      },
      distinct: ['productId'],
      orderBy: {
        id: "desc"
      }
    })
  }
  async deleteProductOrderById(id: Product["id"]): Promise<void> {
   await prisma.productOrder.deleteMany({
      where: {
        productId: id
      }
    })
  }
  async incrementProductOrderItem(id: ProductOrder["id"]): Promise<ProductOrder|null> {
    return await prisma.productOrder.update({
      where: {
        id: id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    })
  }
  async decrementProductOrderItem(id: ProductOrder["id"]): Promise<ProductOrder> {
    return await prisma.productOrder.update({
      where: {
        id: id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    })
  }
  async findProductOrderByProductId(id: Product["id"]): Promise<ProductOrder|null> {
    return await prisma.productOrder.findFirst({
      where: {
        productId: id,
      },
      orderBy: {
        id: "desc"
      }
    });
  }
}
 