import { PrismaClient, Prisma, Product } from "@prisma/client";
import createHttpError from "http-errors";
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
    try {
      return await prisma.product.create({
        data: {
          ...data,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          console.log("The product with such name already exists");
        }
      }
      throw err;
    }
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
