import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

export const generateHash = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
export const compareHash = (password: User["password"], hashedPassword: User["password"]) => {
    return bcrypt.compare(password, hashedPassword);
  };
