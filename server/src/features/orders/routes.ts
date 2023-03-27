import { Router } from "express";
import { OrderService } from "./services";

const OrderServiceInstance = new OrderService();
export const ordersRouter = Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await OrderServiceInstance.getAll();
    res.status(200).send(allProducts);
  } catch (err) {
    next(err);
  }
});
ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const selectedOrder = await OrderServiceInstance.get(Number(orderId));
    res.status(200).send(selectedOrder);
  } catch (err) {
    next(err);
  }
});
