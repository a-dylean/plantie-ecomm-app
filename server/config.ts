import env from "dotenv";
env.config({ path: "./.env"});

export const SECRET_KEY = process.env.JWT_SECRET_KEY || "my-secret";
export const EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const PORT = process.env.PORT || 4001;
export const STRIPE_SK = process.env.STRIPE_SK || "";
