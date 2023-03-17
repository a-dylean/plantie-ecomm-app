import { Product } from "@prisma/client";
import createHttpError from "http-errors";
import { ProductModel } from "./model";
import { ProductCreationParams } from "./model";
const ProductModelInstance = new ProductModel();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class ProductService {
  async getAll(): Promise<Product[]> {
    try {
      return await ProductModelInstance.getAll();
    } catch (err) {
      throw err;
    }
  }
  async get(id: Product["id"]): Promise<Product> {
    try {
      const product = await ProductModelInstance.findProductById(id);
      if (!product) {
        throw createHttpError(404, "Plant not found!");
      }
      return product;
    } catch (err) {
      throw err;
    }
  }
  async register( data: ProductCreationParams): Promise<Product> {
    return await ProductModelInstance.create(data);
  }
  async update(id: number, data: ProductCreationParams): Promise<Product> {
    try {
      return await ProductModelInstance.update(id, data);
    } catch (err) {
      throw err;
    }
  }
  async filter(categoryId: number): Promise<Product[]> {
    try {
      const products = await ProductModelInstance.findProductsByCategory(
        categoryId
      );
      if (!products) {
        throw createHttpError(404, "Plants not found!");
      }
      return products;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: Product["id"]): Promise<void> {
    try {
      return await ProductModelInstance.deleteProductById(id);
    } catch (err) {
      throw createHttpError(500);
    }
  }
}
