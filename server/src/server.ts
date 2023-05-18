import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";
import { NotFoundError } from "./helpers/errors";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "../build/swagger.json";
import bodyParser from "body-parser";
import { Prisma } from "@prisma/client";
import { AuthError } from "./helpers/errors";
import { PORT } from "../config";
import { validationErrorHandler, uniquenessValidationErrorHandler} from "./helpers/errors";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:4001", credentials: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

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

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
