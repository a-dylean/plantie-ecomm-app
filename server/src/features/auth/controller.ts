import {
    Body,
    Controller,
    Post,
    Route,
    Tags,
  } from "tsoa";
  import { User } from "@prisma/client";
  import { AuthService } from "./services";
  import { UserCreationParams, UserLoginParams } from "../users/model";

@Route("login")
@Tags("Auth")
export class LoginController extends Controller {
    @Post()
    public async login( @Body() requestBody: UserLoginParams): Promise<User> {
        return new AuthService().login(requestBody);
    }
}

@Route("register")
@Tags("Auth")
export class registerRouter extends Controller {
    @Post()
    public async register( @Body() requestBody: UserCreationParams): Promise<User> {
        return new AuthService().register(requestBody);
    }
}