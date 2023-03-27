import { UserCreationParams, UserLoginParams, UserModel } from "../users/model";
import { compareHash, generateHash } from "../../helpers/bcrypt";
import { createAuthToken } from "../../helpers/jwt";
import { User } from "@prisma/client";
import { AuthError } from "../../helpers/errors";

const UserModuleInstance = new UserModel();

export class AuthService {
  async login(data: UserLoginParams): Promise<any> {
    const { email, password } = data;
    const user = await UserModuleInstance.findUserByEmail(email);
    if (!user) {
      throw new AuthError("User not found");
    }
    if (user && (await compareHash(password, user.password))) {
      const token = createAuthToken({
        id: user.id,
        name: user.name,
        email: user.email,
        scopes: [user.role],
      });
      return {
        id: user.id,
        name: user.name,
        email: email,
        token: token,
      };
    } else {
      throw new AuthError("Wrong password");
    }
  }
  async register(data: UserCreationParams): Promise<User> {
    const { password } = data;
    const hashedPassword = await generateHash(password);
    return await UserModuleInstance.create({
      ...data,
      password: hashedPassword,
    });
  }
}
