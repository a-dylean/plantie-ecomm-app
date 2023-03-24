import {
  Controller,
  Delete,
  Get,
  Path,
  Query,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { User } from "@prisma/client";
import { UserService } from "./services";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  /**
   * Retrieves a list of all users in the system.
   * @returns List of users
   */
  @Security("jwt", ["admin"])
  @Get()
  public async getUsers(): Promise<User[]> {
    return new UserService().getAll();
  }
  /**
   * Retrieves the detailes of a particular user provided the unique user ID.
   * @param userId Identifier of the user
   * @returns User
   */
  @Security("jwt", ["admin"])
  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<User> {
    return new UserService().get(userId);
  }
  /**
   * Deletes a user from the system.
   * @param userId Identifier of the user
   */
  @Security("jwt", ["admin"])
  @SuccessResponse("204", "User deleted")
  @Delete("{userId}")
  public async deleteUser(@Path() userId: number): Promise<void> {
    this.setStatus(204);
    new UserService().delete(userId);
    return;
  }
}

@Route("me")
@Tags("Users")
export class ProfileController extends Controller {
  /**
   * Retrieves the detailes of a particular user provided the unique user ID.
   * @param userId Identifier of the user
   * @returns User
   */
  @Security("jwt")
  @Get()
  public async getUserProfile(@Query() userId: number): Promise<User> {
    return new UserService().get(userId);
  }
}
