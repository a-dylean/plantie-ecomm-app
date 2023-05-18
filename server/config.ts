import env from "dotenv";
env.config({ path: "./.env"});

export const SECRET_KEY = process.env.JWT_SECRET_KEY || "my-secret";
export const ACCESSTOKEN_EXPIRES_IN = process.env.JWT_ACCESSTOKEN_EXPIRES_IN;
export const REFRESHTOKEN_EXPIRES_IN = process.env.JWT_REFRESHTOKEN_EXPIRES_IN;
export const PORT = parseInt(process.env.PORT || "4001");
export const STRIPE_SK = process.env.STRIPE_SK || "";
export const ENDPOINT_SECRET = process.env.ENDPOINT_SECRET;
