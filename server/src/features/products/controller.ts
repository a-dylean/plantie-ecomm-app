import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Query,
} from "tsoa";
import { Product, ProductOrder } from "@prisma/client";
import { ProductService } from "./services";
import { ProductCreationParams } from "./model";
import { OrderService } from "../orders/services";

@Route("products")
@Tags("Products")
export class ProductsController extends Controller {
  /**
   * Retrieves a list of all products in the system. If product category ID is provided, filters the list of products by category.
   * @param categoryId Identifier of category (number)
   * @returns List of products
   */
  @Get()
  public async getProducts(
    @Query() categoryId?: number | null,
    @Query() sortMethod?: any,
    @Query() priceRange?: any
  ): Promise<Product[]> {
    return new ProductService().sortProducts(
      categoryId,
      sortMethod,
      priceRange
    );
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
   * Returns a ProductOrder provided the product ID.
   */
  @Get("/{productId}/product-orders")
  public async getProductOrderByProductId(
    @Path() productId: number
  ): Promise<ProductOrder | null> {
    return new OrderService().getProductOrderByProductId(productId);
  }
  /**
   * Creates a new product in the system.
   * @param requestBody Details of the product: name, description, price, availability, category ID
   */
  @Security("jwt", ["admin"])
  @Post()
  @SuccessResponse("201", "Product created")
  public async createProduct(
    @Body() requestBody: ProductCreationParams
  ): Promise<Product> {
    this.setStatus(201);
    return new ProductService().create(requestBody);
  }
  /**
   *Updates the detailes of a particular product provided the unique product ID.
   * @param productId Identifier of the product
   * @param requestBody Details of the product: name, description, price, availability, category ID
   * @returns Updated product
   */
  @Security("jwt", ["admin"])
  @SuccessResponse("200", "Product information updated")
  @Put("{productId}")
  public async updateProduct(
    @Path() productId: number,
    @Body() requestBody: ProductCreationParams
  ): Promise<Product> {
    this.setStatus(200);
    return new ProductService().update(productId, requestBody);
  }
  /**
   * Deletes a product from the system.
   * @param productId Identifier of the product
   */
  @Security("jwt", ["admin"])
  @SuccessResponse("204", "Product deleted")
  @Delete("{productId}")
  public async deleteProduct(@Path() productId: number): Promise<void> {
    this.setStatus(204);
    new ProductService().delete(productId);
    return;
  }
}
