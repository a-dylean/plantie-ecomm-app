import { Body, Controller, Post, Route, Tags } from "tsoa";
import { User } from "@prisma/client";
import { AuthService } from "./services";
import { UserCreationParams, UserLoginParams } from "../users/model";

@Route("login")
@Tags("Auth")
export class LoginController extends Controller {
  /**
   * Logs in user to the system and creates an access token.
   * @param requestBody Login (email) and password
   * @returns User authentication details
   */
  @Post()
  public async login(
    @Body() requestBody: UserLoginParams
  ): Promise<User | string> {
    return new AuthService().login(requestBody);
  }
}

@Route("register")
@Tags("Auth")
export class registerRouter extends Controller {
  /**
   * Registers a new user in the system
   * @param requestBody User's details required for account creation
   * @returns User details
   */
  @Post()
  public async register(
    @Body() requestBody: UserCreationParams
  ): Promise<User> {
    return new AuthService().create(requestBody);
  }
}
