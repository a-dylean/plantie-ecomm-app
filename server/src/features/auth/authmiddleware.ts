import { Request as ExRequest } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../../config";
import { AuthError } from "../../helpers/errors";

export const expressAuthentication = async (
  req: ExRequest,
  securityName: string,
  scopes: string[]
) => {
  const bearerToken = req.headers.authorization?.split(" ");
  const token =
    bearerToken && bearerToken[0] === "Bearer" ? bearerToken[1] : null;
  return new Promise((resolve, reject) => {
    if (!bearerToken || !token) {
      reject(new AuthError("No token provided"));
    } else {
      jwt.verify(
        token.toString(),
        SECRET_KEY,
        function (err: any, decoded: any) {
          if (err) {
            reject(err);
          } else {
            for (let scope of scopes) {
              if (!decoded.scopes.includes(scope)) {
                reject(new AuthError("Permissions check failure"));
              }
            }
            resolve(decoded);
          }
        }
      );
    }
  });
};
