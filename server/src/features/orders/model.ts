import { Order, PrismaClient, Product, ProductOrder, User } from "@prisma/client";
const prisma = new PrismaClient();

export type ProductOrderCreationParams = Pick<
  ProductOrder,
  "productId" | "orderId" | "quantity" | "price"
>;

export type OrderCreationParams = Pick<Order, "userId">;

export class OrderModel {
  async createProductOrder(
    data: ProductOrderCreationParams
  ): Promise<ProductOrder | undefined> {
    const productId = data.productId;
    const productOrder = await prisma.productOrder.findMany({
      where: {
        productId: productId
      }
    })

    if (productOrder.length === 0) {
      return await prisma.productOrder.create({
      data: {
        ...data,
      },
    });
    }
  }
  async createOrder(data: OrderCreationParams): Promise<Order | undefined> {
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
  async deleteProductOrderById(id: ProductOrder["id"]): Promise<void> {
   await prisma.productOrder.delete({
      where: {
        id: id
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
 