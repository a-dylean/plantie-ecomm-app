import { Body, Controller, Middlewares, Post, Request, Response, Route, SuccessResponse, Tags } from "tsoa";
import { User } from "@prisma/client";
import { AuthService } from "./services";
import { UserCreationParams, UserLoginParams } from "../users/model";
import cookieParser from "cookie-parser";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
  RequestHandler,
} from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../../config";
import { AuthError } from "../../helpers/errors";
import { createAccessToken, decodeAuthToken } from "../../helpers/jwt";
import { UserService } from "../users/services";
import { access } from "fs";

export interface UserInfo {
  id: number,
  accessToken: string,
  refreshToken: string
}
//@Middlewares([cookieParser])
@Route("session")
@Tags("Auth")
export class AuthController extends Controller {
  /**
   * Logs in user to the system and creates an access token.
   * @param requestBody Login (email) and password
   * @returns User authentication details
   */
  @Post("authenticate")
  public async login(
    @Request() req: ExRequest,
    @Body() requestBody: UserLoginParams
    ): Promise<Partial<User>> {
      const data = await new AuthService().getUserId(requestBody);
      const refreshToken = await new AuthService().generateRefreshToken(data.id, data.role);
      req.res?.cookie('refresh_token', refreshToken, { 
        httpOnly: true,
        path: '/session/refresh',
      })
      return data;
  }

  @Post("start")
  public async createUser(
    @Request() req: ExRequest
  ): Promise<UserInfo> {
    const user = await new AuthService().createUser();
    const accessToken = createAccessToken({id: user.id, scopes: [user.role]})
    const refreshToken = await new AuthService().generateRefreshToken(user.id, user.role);
    req.res?.cookie('refresh_token', refreshToken, { 
      httpOnly: true,
      path: '/session/refresh'
    })
    return {
      id: user.id,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  @Post("refresh")
  public async refresh(
    @Request() req: ExRequest
  ): Promise<any> {
    const refreshToken = req.cookies.refresh_token;
    const isValid = jwt.verify(refreshToken, SECRET_KEY);
    if (!isValid) {
      throw new AuthError("Invalid token, login again!")
    } else {
      const decoded = decodeAuthToken(refreshToken)
      const user = await new UserService().getUserById(decoded.id);
      const accessToken = createAccessToken({id: user.id, scopes: [user.role]})
      return {token: accessToken}
    }
  }
}
