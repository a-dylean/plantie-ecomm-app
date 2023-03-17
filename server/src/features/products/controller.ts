import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { Product } from "@prisma/client";
import { ProductService } from "./services";
import { request } from "http";
import { ProductCreationParams } from "./model";

@Route("products")
export class ProductsController extends Controller {
  /**
   * Retrieves a list of all products in the system.
   * @returns A list of products
   */
  @Get()
  public async getProducts(
  ): Promise<Product[]> {
    return new ProductService().getAll();
  }
  /**
   * Retrieves the detailes of a particular product provided the unique product ID.
   * @param productId Identifier of the product
   * @returns Product
   */
  @Get("{productId}")
  public async getProduct(@Path() productId: number): Promise<Product> {
    return new ProductService().get(productId);
  }
  /**
   * Creates a new product in the system.
   * @param requestBody Details of the product: name, description, price, availability, category ID
   */
  @SuccessResponse("201", "Product created")
  @Post()
  public async createProduct(
    @Body() requestBody: ProductCreationParams
  ): Promise<Product> {
    this.setStatus(201);
    return new ProductService().register(requestBody);
  }
  /**
   *Updates the detailes of a particular product provided the unique product ID.
   * @param productId Identifier of the product
   * @param requestBody Details of the product: name, description, price, availability, category ID
   * @returns Updated product
   */
  @SuccessResponse("200", "Product information updated")
  @Put("{productId}")
  public async updateProduct(
    @Path() productId: number,
    @Body() requestBody: ProductCreationParams
  ): Promise<Product> {
    this.setStatus(200);
    return new ProductService().update(productId, requestBody);
  }

  @SuccessResponse("204", "Product deleted")
  @Delete("{productId}")
  public async deleteProduct(
    @Path() productId: number, 
  ): Promise<void> {
    this.setStatus(204);
    new ProductService().delete(productId);
    return;
  }
}
