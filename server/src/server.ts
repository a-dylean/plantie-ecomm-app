import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
  RequestHandler,
} from "express";
import { ValidateError } from "tsoa";
import { NotFoundError } from "./helpers/errors";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "../build/swagger.json";
import bodyParser from "body-parser";
import { Prisma } from "@prisma/client";
import { AuthError } from "./helpers/errors";
import { PORT, STRIPE_SK } from "../config";
import {
  validationErrorHandler,
  uniquenessValidationErrorHandler,
} from "./helpers/errors";
import path from "path";

//STRIPE
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

const stripe = new Stripe(STRIPE_SK, {
  apiVersion: "2022-11-15",
  typescript: true,
});

const createCustomer = async () => {
  const params: Stripe.CustomerCreateParams = {
    description: 'test customer',
  };

  const customer: Stripe.Customer = await stripe.customers.create(params);

  console.log(customer.id);
};
createCustomer();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ 
  credentials: true,
  origin: ['http://localhost:3000'],
  allowedHeaders: ['authorization', 'content-type', 'cookies'],
}));
app.use(cookieParser());

RegisterRoutes(app);

app.use(["/api-docs"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    validationErrorHandler(res, req, err);
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    uniquenessValidationErrorHandler(res, req, err);
  }
  if (err instanceof AuthError) {
    console.error(err);
    console.error(err.stack);
    return res.status(403).json({
      message: "Authorization Failed",
      details: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    console.error(err);
    console.error(err.stack);
    return res.status(404).json({
      message: "Not found",
      details: err.message,
    });
  }
  if (err instanceof Error) {
    console.error(err);
    console.error(err.stack);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  next();
});

// app.post("/create-checkout-session", (req, res) => {
//   res.json({ url: "Hi"})
// })

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on ${PORT}`);
});
