import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const generateHash = async (password: string) => {
    // this is a good place to use a constant for the salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
// probably should be named comparePasswordToHash or something like that, because it's not comparing hashes, or just validatePassword, because it's what it does
export const compareHash = (password: User["password"], hashedPassword: User["password"]) => {
    return bcrypt.compare(password, hashedPassword);
  };
