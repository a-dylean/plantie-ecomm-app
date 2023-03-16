import { User } from "@prisma/client";
import { Router } from "express";
import { generateHash } from "../../../helpers/bcrypt";
import { AuthService } from "../services";
export const registerRouter = Router();

const AuthServiceInstance = new AuthService();

registerRouter.get("/", (req, res) => {
  console.log("register");
});

registerRouter.post("/", async (req, res, next) => {
  const data: User = req.body;
  const hashedPassword: string = await generateHash(data.password);
  try {
    const response = await AuthServiceInstance.register({
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: hashedPassword,
    });
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});
