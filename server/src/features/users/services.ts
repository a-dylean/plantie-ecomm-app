import { User } from "@prisma/client";
import { NotFoundError } from "../../helpers/errors";
import { UserModel } from "./model";
const UserModelInstance = new UserModel();

export class UserService {
  async getUserById(id: User["id"]): Promise<User> {
    const user = await UserModelInstance.findUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
  async getAll(): Promise<User[]> {
    return await UserModelInstance.getAll();
  }
  async update(data: User): Promise<User> {
    return await UserModelInstance.update(data);
  }
  async delete(id: User["id"]): Promise<void> {
    return await UserModelInstance.deleteUserById(id);
  }
}
