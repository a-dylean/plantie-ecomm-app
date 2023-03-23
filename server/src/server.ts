import express, {   
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
 } from 'express';

import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import passport from 'passport';
import cookieParser from "cookie-parser";
import session from "express-session";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "../build/swagger.json";
import bodyParser from 'body-parser';
import { Prisma } from "@prisma/client";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:4001", credentials: true }))
app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

RegisterRoutes(app);

app.use(["/api-docs"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

const PORT = process.env.PORT || 4001;


app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const errorMeta = err.meta as Record<string, Array<string>>
      return res.status(422).json({
        message: "Uniqueness validation failed",
        details: errorMeta.target.reduce((obj, field) => ({ 
          ...obj,
          [`requestBody.${field}`]: {
            message: `value already used`,
            value: req.body[field]
          },
        }), {}),
      });
    }
  }
  if (err instanceof Error) {
    console.error(err);
    console.error(err.stack)
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  next();
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});