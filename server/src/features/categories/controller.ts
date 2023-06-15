import { Category } from "@prisma/client";
import { Controller, Get, Route, Tags } from "tsoa";
import { CategoryService } from "./services";

@Route("categories")
@Tags("Categories")
export class CategoriesController extends Controller {
  /**
   * Retrieves a list of all categories in the system. If filtering criteria are provided, filters the list of products.
   * @returns List of categories
   */
  @Get()
  public async getCategories(): Promise<Category[]> {
    return await new CategoryService().getAll();
  }
}
