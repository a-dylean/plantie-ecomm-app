import { Router } from "express";
import { UserService } from "./services";
const UserServiceInstance = new UserService();
export const usersRouter = Router();
usersRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await UserServiceInstance.getAll();
    res.status(200).send(allUsers);
  } catch (err) {
    next(err);
  }
});
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const response = await UserServiceInstance.get(Number(userId));
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});
usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const response = await UserServiceInstance.update({ id: userId, ...data });
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});
usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deleteUser = await UserServiceInstance.delete(Number(userId));
    res.status(204).send(deleteUser);
  } catch (err) {
    next(err);
  }
});
