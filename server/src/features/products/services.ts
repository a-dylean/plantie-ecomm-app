import { Product } from "@prisma/client";
import createHttpError from "http-errors";
import { ProductModel } from "./model";
const ProductModelInstance = new ProductModel();

export class ProductService {
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
  async getAll(): Promise<Product[]> {
    try {
      return await ProductModelInstance.getAll();
    } catch (err) {
      throw err;
    }
  }
  async update(data: Product): Promise<Product> {
    try {
      return await ProductModelInstance.update(data);
    } catch (err) {
      throw err;
    }
  }
  async filter(categoryId: Product["categoryId"]): Promise<Product[]> {
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
  async register(data: Product): Promise<Product> {
      const newProduct = await ProductModelInstance.create(data);
      return newProduct;
  }
  async delete(id: Product["id"]): Promise<void> {
    try {
      return await ProductModelInstance.deleteProductById(id);
    } catch (err) {
      throw createHttpError(500);
    }
  }
};