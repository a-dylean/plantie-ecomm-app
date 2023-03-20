import { User } from "@prisma/client";
import createHttpError from "http-errors";
import { UserCreationParams, UserModel } from"./model";
const UserModelInstance = new UserModel();

export class UserService {
  async get(id: User["id"]): Promise<User> {
    try {
      const user = await UserModelInstance.findUserById(id);
      if (!user) {
        throw createHttpError(404, "User record not found!");
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
  async getAll(): Promise<User[]> {
    try {
      return await UserModelInstance.getAll();
    } catch (err) {
      throw err;
    }
  }
  async update(data: User): Promise<UserCreationParams> {
    try {
      return await UserModelInstance.update(data);
    } catch (err) {
      throw err;
    }
  }
  async delete(id: User["id"]): Promise<void> {
    try {
      return await UserModelInstance.deleteUserById(id);
    } catch (err) {
      throw createHttpError(500);
    }
  }
};