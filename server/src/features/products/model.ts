import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

export class ProductModel {
  async create(data: Product): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        available: data.available,
        categoryId: data.categoryId,
      },
    });
    return newProduct;
  }
  async getAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }
  async update(data: Product): Promise<Product> {
    const { id, ...params } = data;
    return await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
  }
  async findProductById(id: Product["id"]): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }
  async deleteProductById(id: Product["id"]): Promise<void> {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
  async findProductsByCategory(
    category: Product["categoryId"]
  ): Promise<Product[]> {
    return await prisma.product.findMany({
      where: {
        categoryId: category,
      },
    });
  }
}
