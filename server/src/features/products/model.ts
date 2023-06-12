import { Category, Prisma, PrismaClient, Product } from "@prisma/client";
import { stripe } from "../orders/controller";
const prisma = new PrismaClient();

export type ProductCreationParams = Pick<
  Product,
  "name" | "description" | "price" | "available" | "categoryName"
>;

export class ProductModel {
  async create(data: ProductCreationParams): Promise<Product> {
    const product = await stripe.products.create({
      name: data.name,
      default_price_data: {
        unit_amount: Number(data.price) * 100,
        currency: "eur",
      },
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Number(data.price) * 100,
      currency: "eur",
    });
    return await prisma.product.create({
      data: {
        ...data,
      },
    });
  }
  async update(id: number, data: ProductCreationParams): Promise<Product> {
    await stripe.products.update(id.toString(), {
      name: data.name,
      active: data.available,
      description: data.description,
    });
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
    await stripe.products.del(id.toString());
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
  async sortProducts(
    priceRange: string,
    categoryName?: Category["categoryName"],
    sortMethod?: Prisma.SortOrder,
    searchItem?: string
  ): Promise<Product[]> {
    const priceRangeArr = priceRange.split(",");
    return await prisma.product.findMany({
      where: {
        AND: [
          {
            price: {
              gte: priceRangeArr[0],
              lte: priceRangeArr[1],
            },
          },
          {
            categoryName: categoryName,
          },
          {
            name: {
              search: searchItem,
            },
          },
        ],
      },
      orderBy: {
        ...(sortMethod ? { price: sortMethod } : {}),
      },
    });
  }
}
