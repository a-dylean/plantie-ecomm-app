// import { User } from "@prisma/client";
// import { Router, Response } from "express";
// import { AuthService } from "../services";
// const AuthServiceInstance = new AuthService();
// export const loginRouter = Router();

// loginRouter.get("/", (res: Response) => {
//   res.send("login");
// });

// loginRouter.post("/", async (req, res: Response, next) => {
//   try {
//     const data: User = req.body;
//     const response = await AuthServiceInstance.login(data.email, data.password);
//     res.status(200).send(response);
//   } catch (err) {
//     next(err);
//   }
// });
