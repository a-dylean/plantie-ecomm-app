const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = class ProductModel {
  async create(data) {
    try {
      const result = await prisma.product
        .create({
          data: {
            name: data.name,
            description: data.description,
            price: data.price,
            available: data.available,
            categoryId: data.categoryId,
          },
        })
        return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAll() {
    try {
        const result = await prisma.product.findMany();
        return result;
    } catch (err) {
        throw new Error(err);
    }
  }
  async update(data) {
    try {
        const { id, ...params } = data;
        const result = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: { 
                ...params } 
        }) 
        return result;
    } catch (err) {
        throw new Error(err);
    }
  }
  async findProductById(id) {
    try {
        const result = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })
        return result;
    } catch (err) {
        throw new Error(err);
    }
  }
  async deleteProductById(id) {
    try {
        const result = await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        if (result) {
            return "Product has been deleted!";
          }
          return null;
    } catch (err) {
        throw new Error(err);
    }
  }

//need to check if it works
  async findProductsByCategory(category) {
    try {
        const result = await prisma.product.findMany({
            where: {
                categoryId: Number(category)
            }
        })
        return result;

    } catch (err) {
        throw new Error(err);
    }
  }
};
