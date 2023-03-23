import {
  UserAuthenticationParams,
  UserCreationParams,
  UserLoginParams,
  UserModel,
} from "../users/model";
import { compareHash, generateHash } from "../../helpers/bcrypt";
import { createAuthToken } from "../../helpers/jwt";

const UserModuleInstance = new UserModel();

export class AuthService {
  async login(data: UserLoginParams): Promise<any> {
    const { email, password } = data;
    const user = await UserModuleInstance.findUserByEmail(email);
    if (user && (await compareHash(password, user.password))) {
      const token = createAuthToken({
        id: user.id,
        name: user.name,
        email: user.email,
        scopes: [user.role]
      });
      return {
        id: user.id,
        name: user.name,
        email: email,
        token: token,
      };
    } else {
      return;
    }
  }
  async register(data: UserCreationParams): Promise<any> {
    const { email, password } = data;
    const hashedPassword = await generateHash(password);
    const userExists = await UserModuleInstance.findUserByEmail(email);
    if (userExists) {
      throw new Error("User with such email already exists!");
    }
    return await UserModuleInstance.create({...data,password: hashedPassword} );
  }
}
