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
    const orderId = data.orderId;
    const productOrder = await prisma.productOrder.findMany({
      where: {
        productId: productId,
        orderId: orderId
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
        status: "Draft",
      },
    });
    if (draftOrder.length === 0) {
      return await prisma.order.create({
      data: {
        ...data,
      },
    });
    }
  }
  async getAll(id: User["id"]): Promise<Order[]> {
    return await prisma.order.findMany({
      where: {
        userId: id
      },
      orderBy: {
        id: "desc"
      }
    });
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

  async deleteProductOrderById(id: ProductOrder["id"]): Promise<void> {
   await prisma.productOrder.delete({
      where: {
        id: id
      }
    })
  }
  async updateQuantity(id: ProductOrder["id"], count: number): Promise<ProductOrder> {
    return await prisma.productOrder.update({
      where: {
        id: id
      },
      data: {
        quantity: count
      }
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
  async getCart(id: Order["id"]): Promise<ProductOrder[]|null>{
    return await prisma.productOrder.findMany({
      where: {
        orderId: id
      },
      orderBy: {
        id: "desc"
      }
    })
  }
  async paymentReceived(id: Order["id"], amount: Order['amount']): Promise<Order> {
    return await prisma.order.update({
      where: {
        id: id
      },
      data: {
        status: "Payment Received",
        amount: amount
      }
    })
  }
}
 