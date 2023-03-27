import { Product } from "@prisma/client";
import { NotFoundError } from "../../helpers/errors";
import { ProductModel } from "./model";
import { ProductCreationParams } from "./model";
const ProductModelInstance = new ProductModel();

export class ProductService {
  async getAll(): Promise<Product[]> {
    return await ProductModelInstance.getAll();
  }
  async get(id: Product["id"]): Promise<Product> {
    const product = await ProductModelInstance.findProductById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }
  // rename to create, it's more CRUD like
  async register(data: ProductCreationParams): Promise<Product> {
    return await ProductModelInstance.create(data);
  }
  async update(id: number, data: ProductCreationParams): Promise<Product> {
    return await ProductModelInstance.update(id, data);
  }
  // rename to filterByCategory
  async filter(categoryId: number): Promise<Product[]> {
    const products = await ProductModelInstance.findProductsByCategory(
      categoryId
    );
    if (!products) {
      throw new NotFoundError("Products of the selected category not found");
    }
    return products;
  }
  async delete(id: Product["id"]): Promise<void> {
    return await ProductModelInstance.deleteProductById(id);
  }
}
