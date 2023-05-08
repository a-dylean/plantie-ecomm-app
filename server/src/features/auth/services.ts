import { UserCreationParams, UserLoginParams, UserModel } from "../users/model";
import { validatePassword, generateHash } from "../../helpers/bcrypt";
import { createAccessToken, createRefreshToken } from "../../helpers/jwt";
import { Token, User } from "@prisma/client";
import { AuthError } from "../../helpers/errors";
import { AuthModel } from "./model";

const UserModuleInstance = new UserModel();
const AuthModelInstance = new AuthModel();

export class AuthService {
  // async generateAccessToken(data: Partial<User>): Promise<Partial<Token>> {
  //   const accessToken = createAccessToken({id: data.id, scopes: [data.role]})
  //   return {
  //     token: accessToken,
  //   } 
  // }
  async getUserId(data: UserLoginParams): Promise<any> {
    const { email, password } = data;
    const user = await UserModuleInstance.findUserByEmail(email);
    if (!user) {
      throw new AuthError("User not found");
    }
    if (user && user.password && (await validatePassword(password, user.password))) {
      const accessToken = createAccessToken({id: user.id, scopes: [user.role]})
      return {
        id: user.id,
        role: user.role,
        token: accessToken
      }
    } else {
      throw new AuthError("Wrong password");
    }
  }
  async generateRefreshToken(id: number, role: string): Promise<string> {
    const refreshToken = createRefreshToken({
      id: id,
      scopes: role
    });
    AuthModelInstance.createToken({userId: id, token: refreshToken})
    return refreshToken;
  }
  async createUser(): Promise<User> {
    return await UserModuleInstance.createUser() 
  }
}
