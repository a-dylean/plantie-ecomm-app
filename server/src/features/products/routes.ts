import { Product } from "@prisma/client";
import { Router } from "express";
import { ProductService } from "./services";
const ProductServiceInstance = new ProductService();
export const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const categoryId = req.query.category;
    if (categoryId) {
      const selectedProducts = await ProductServiceInstance.filter(
        Number(categoryId)
      );
      res.status(200).send(selectedProducts);
    } else {
      const allProducts = await ProductServiceInstance.getAll();
      res.status(200).send(allProducts);
    }
  } catch (err) {
    next(err);
  }
});
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const selectedProduct = await ProductServiceInstance.get(Number(productId));
    res.status(200).send(selectedProduct);
  } catch (err) {
    next(err);
  }
});
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const response = await ProductServiceInstance.update({
      id: productId,
      ...data,
    });
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});
productsRouter.post("/", async (req, res, next) => {
  const data: Product = req.body;
  try {
    const newProduct = await ProductServiceInstance.register({
      name: data.name,
      description: data.description,
      price: data.price,
      available: data.available,
      categoryId: data.categoryId,
    });
    res.status(200).send(newProduct);
  } catch (err) {
    next(err);
  }
});
productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deleteProduct = await ProductServiceInstance.delete(
      Number(productId)
    );
    res.status(204).send(deleteProduct);
  } catch (err) {
    next(err);
  }
});
