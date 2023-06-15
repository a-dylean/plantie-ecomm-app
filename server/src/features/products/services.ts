import { Prisma, Product } from "@prisma/client";
import { NotFoundError } from "../../helpers/errors";
import { ProductModel } from "./model";
import { ProductCreationParams } from "./model";
const ProductModelInstance = new ProductModel();

export class ProductService {
  async get(id: Product["id"]): Promise<Product> {
    const product = await ProductModelInstance.findProductById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }
  async create(data: ProductCreationParams): Promise<Product> {
    return await ProductModelInstance.create(data);
  }
  async update(id: number, data: ProductCreationParams): Promise<Product> {
    return await ProductModelInstance.update(id, data);
  }
  async delete(id: Product["id"]): Promise<void> {
    return await ProductModelInstance.deleteProductById(id);
  }
  async sortProducts(
    priceRange: string,
    categoryName?: string,
    orderBy?: Prisma.SortOrder,
    searchItem?: string
  ): Promise<Product[]> {
    return await ProductModelInstance.sortProducts(
      priceRange,
      categoryName,
      orderBy,
      searchItem
    );
  }
}
