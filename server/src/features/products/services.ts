import { Product } from "@prisma/client";
import createHttpError from "http-errors";
import { ProductModel } from "./model";
import { ProductCreationParams } from "./model";
import { Prisma } from "@prisma/client";
const ProductModelInstance = new ProductModel();

export class ProductService {
  async getAll(): Promise<Product[]> {
    return await ProductModelInstance.getAll();
  }
  async get(id: Product["id"]): Promise<Product> {
    const product = await ProductModelInstance.findProductById(id);
    if (!product) {
      throw createHttpError(404, "Plant not found!");
    }
    return product;
  }
  async register( data: ProductCreationParams): Promise<Product> {
    return await ProductModelInstance.create(data);
  }
  async update(id: number, data: ProductCreationParams): Promise<Product> {
    return await ProductModelInstance.update(id, data);
  }
  async filter(categoryId: number): Promise<Product[]> {
    const products = await ProductModelInstance.findProductsByCategory(
      categoryId
    );
    return products;
  }

  async delete(id: Product["id"]): Promise<void> {
    return await ProductModelInstance.deleteProductById(id);
  }
}
