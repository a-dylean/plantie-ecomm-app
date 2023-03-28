import { Prisma } from "@prisma/client";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export const validationErrorHandler = (res: ExResponse, req: ExRequest, err: ValidateError) => {
  console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
}

export const uniquenessValidationErrorHandler = (res: ExResponse, req: ExRequest, err: Prisma.PrismaClientKnownRequestError) => {
  if (err.code === "P2002") {
    const errorMeta = err.meta as Record<string, Array<string>>;
    return res.status(422).json({
      message: "Uniqueness validation failed",
      details: errorMeta.target.reduce(
        (obj, field) => ({
          ...obj,
          [`requestBody.${field}`]: {
            message: `Value already used`,
            value: req.body[field],
          },
        }),
        {}
      ),
    });
  }
}