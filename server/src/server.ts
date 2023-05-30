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
import { Prisma } from "@prisma/client";
import { AuthError } from "./helpers/errors";
import { PORT } from "../config";
import {
  validationErrorHandler,
  uniquenessValidationErrorHandler,
} from "./helpers/errors";

const app = express();
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
    next();
  }
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    uniquenessValidationErrorHandler(res, req, err);
    next();
  }
  else if (err instanceof AuthError) {
    console.error(err);
    console.error(err.stack);
    return res.status(403).json({
      message: "Authorization Failed",
      details: err.message,
    });
  }
  else if (err instanceof NotFoundError) {
    console.error(err);
    console.error(err.stack);
    return res.status(404).json({
      message: "Not found",
      details: err.message,
    });
  }
  else if (err instanceof Error) {
    console.error(err);
    console.error(err.stack);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  next();
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on ${PORT}`);
});
