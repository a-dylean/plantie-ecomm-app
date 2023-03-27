import createHttpError from "http-errors";
import { UserModel } from "../users/model";
import { compareHash } from "../../helpers/bcrypt";
import { User } from "@prisma/client";

const UserModuleInstance = new UserModel();

export class AuthService {
  async login(email: User["email"], password: User["password"]): Promise<User> {
    const user = await UserModuleInstance.findUserByEmail(email);
    if (!user) {
      throw createHttpError(401, "User not found!");
    } else {
      const matchedPassword = await compareHash(password, user.password);
      if (!matchedPassword) {
        throw createHttpError(401, "Wrong credentials!");
      }
      return user;
    }
  }
  async register(data: User): Promise<User> {
    const { email } = data;
    const userExists = await UserModuleInstance.findUserByEmail(email);
    if (userExists) {
      throw createHttpError(409, "User with such email already exists!");
    }
    return await UserModuleInstance.create(data);
  }
}
