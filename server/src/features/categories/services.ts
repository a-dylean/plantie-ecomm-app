import { Category } from "@prisma/client";
import { CategoryModel } from "./model";

const CategoryModelInstance = new CategoryModel();

export class CategoryService {
  async getAll(): Promise<Category[]> {
    return await CategoryModelInstance.getAll();
  }
}
