import { env } from "process";

export const SECRET_KEY = env.JWT_SECRET_KEY || "my-secret";
export const EXPIRES_IN = env.JWT_EXPIRES_IN;