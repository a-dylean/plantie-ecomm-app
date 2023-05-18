import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";
import { NotFoundError } from "./helpers/errors";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "../build/swagger.json";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from "@prisma/client";
import { AuthError } from "./helpers/errors";
import { ENDPOINT_SECRET, PORT, STRIPE_SK } from "../config";
import {
  validationErrorHandler,
  uniquenessValidationErrorHandler,
} from "./helpers/errors";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SK, {
  apiVersion: "2022-11-15",
  typescript: true,
});
const prisma = new PrismaClient();
const app = express();
const endpointSecret = ENDPOINT_SECRET;
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature!,
          endpointSecret
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        //Then define and call a function to handle the event checkout.session.completed
        const user = await prisma.user.findUnique({
          where: {
            email: event.data.object.customer_details.email,
          },
        });

        const prismaOrder = await prisma.order.findFirst({
          where: {
            userId: user!.id,
          },
          orderBy: {
            id: "desc",
          },
        });

        await prisma.order.update({
          where: {
            id: prismaOrder!.id,
          },
          data: {
            status: "Payment Received",
            amount: event.data.object.amount_total / 100,
          },
        });
        console.log(checkoutSessionCompleted);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  }
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    allowedHeaders: ["authorization", "content-type", "cookies"],
  })
);
app.use(cookieParser());

RegisterRoutes(app);

app.use(["/api-docs"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

// Should probably be moved to a separate file
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  // I think it can be decomposed into sub functions to make it easier to read (with names according to the error type)
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

app.post("/create-checkout-session", async (req, res) => {
  // const productIds = req.body.OrderItems.map((item: any) => {
  //   return item.productId;
  // })
  // const data = await new ProductService().get(item.productId);
  // console.log(data.name);
  const line_items = req.body.OrderItems.map((item: any) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.productId,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `http://localhost:3000/successfull`,
      cancel_url: `http://localhost:3000/cancelled`,
    });
    res.json({ url: session.url });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on ${PORT}`);
});
