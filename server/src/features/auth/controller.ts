import { Body, Controller, Post, Request, Route, Tags } from "tsoa";
import { User } from "@prisma/client";
import { AuthService } from "./services";
import { UserLoginParams } from "../users/model";
import { Request as ExRequest } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../../config";
import { AuthError } from "../../helpers/errors";
import { createAccessToken, decodeAuthToken } from "../../helpers/jwt";
import { UserService } from "../users/services";

export interface UserInfo {
  id: number;
  accessToken: string;
}

const setRefreshTokenCookie = async (id: number, role: string, req: ExRequest) => {
  const refreshToken = await new AuthService().generateRefreshToken(id, role);
  req.res?.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    path: "/session/refresh",
    sameSite: false,
    maxAge: 60 * 60 * 24 * 100,
    expires: new Date(Date.now() + 60 * 60 * 24 * 100),
  });
};

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
    await setRefreshTokenCookie(data.id, data.role, req);
    return data;
  }
  /**
   * Creates a new user in the system and returns access token and refresh token.
   */
  @Post("start")
  public async createUser(@Request() req: ExRequest): Promise<UserInfo> {
    const user = await new AuthService().createUser();
    const accessToken = createAccessToken({ id: user.id, scopes: [user.role] });
    await setRefreshTokenCookie(user.id, user.role, req);
    return {
      id: user.id,
      accessToken: accessToken,
    };
  }
  /**
   * Updates access token using refresh token.
   */
  @Post("refresh")
  public async refresh(@Request() req: ExRequest): Promise<{}> {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken || !jwt.verify(refreshToken, SECRET_KEY)) {
      throw new AuthError("Invalid token, login again!");
    }
    const decoded = decodeAuthToken(refreshToken);
    const user = await new UserService().getUserById(decoded.id);
    const accessToken = createAccessToken({ id: user.id, scopes: [user.role] });
    return { token: accessToken };
  }
}
