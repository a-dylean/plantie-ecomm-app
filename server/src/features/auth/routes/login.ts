import { User } from "@prisma/client";
import { Router } from "express";
import { AuthService } from "../services";
const AuthServiceInstance = new AuthService();
export const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  console.log("login");
});

loginRouter.post("/", async (req, res, next) => {
  try {
    const data: User = req.body;
    const response = await AuthServiceInstance.login(data.email, data.password);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});
