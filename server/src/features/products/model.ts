import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

export type ProductCreationParams = Pick<
  Product,
  "name" | "description" | "price" | "available" | "categoryId"
>;

export class ProductModel {
  async getAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }
  async create(data: ProductCreationParams): Promise<Product> {
      return await prisma.product.create({
        data: {
          ...data,
        },
      });
  }
  async update(id: number, data: ProductCreationParams): Promise<Product> {
    return await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...data,
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
    category: number
  ): Promise<Product[]> {
    return await prisma.product.findMany({
      where: {
        categoryId: category,
      },
    });
  }
}
