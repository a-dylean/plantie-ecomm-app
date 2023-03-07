const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = class OrderModel {
  async create(data) {
    try {
      const result = await prisma.order.create({
        data: {
          productId: data.productId,
          quantity: data.quantity,
          orderId: data.orderId,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAll() {
    try {
      const result = await prisma.order.findMany();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findOrderById(id) {
    try {
      const result = await prisma.product.findUnique({
        where: {
          id: Number(id),
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
