import env from "dotenv";
env.config({ path: "./.env" });

export const SECRET_KEY = process.env.JWT_SECRET_KEY || "my-secret";
export const ACCESSTOKEN_EXPIRES_IN = process.env.JWT_ACCESSTOKEN_EXPIRES_IN;
export const REFRESHTOKEN_EXPIRES_IN = process.env.JWT_REFRESHTOKEN_EXPIRES_IN;
export const PORT = parseInt(process.env.PORT || "4001");
export const STRIPE_SK = process.env.STRIPE_SK || "";
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

//Stripe settings
export const adjustable_quantity_max = 50;
export const allowed_countries = "FR";
export const shipping_rate_type = "fixed_amount";
export const shipping_rate_fixed_amount_free_delivery = 0;
export const currency = "eur";
export const freeShipping = "Free shipping";
export const business_day = "business_day";
export const shipping_rate_fixed_amount_nextday_shipping = 1000;
export const nextdayShipping = "Next day shipping";
export const delivery_estimate_nextday_free_delivery_min = 5;
export const delivery_estimate_nextday_free_delivery_max = 7;
export const delivery_estimate_nextday_shipping_min = 1;
export const delivery_estimate_nextday_shipping_max = 1;
