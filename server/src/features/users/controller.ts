import {
    Controller,
    Delete,
    Get,
    Path,
    Route,
    SuccessResponse,
    Tags,
  } from "tsoa";
  import { User } from "@prisma/client";
  import { UserService } from "./services";

  @Route("users")
  @Tags("Users")
  export class UsersController extends Controller {
    @Get()
    public async getUsers(): Promise<User[]> {
        return new UserService().getAll();
    }
    @Get("{userId}")
    public async getUser(@Path() userId: number): Promise<User> {
        return new UserService().get(userId);
    }
    @SuccessResponse("204", "User deleted")
    @Delete("{userId}")
    public async deleteUser( @Path() userId: number): Promise<void> {
        this.setStatus(204);
        new UserService().delete(userId);
        return;
    }
  }