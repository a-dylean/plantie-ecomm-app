import {
    Controller,
    Delete,
    Get,
    Path,
    Route,
    Security,
    SuccessResponse,
    Tags
  } from "tsoa";
  import { Middlewares } from "@tsoa/runtime";
  import { User } from "@prisma/client";
  import { UserService } from "./services";
  //import { verifyRole } from "../../helpers/verifyRole";


//   @Middlewares(
//     [verifyRole]
//   )
  @Route("users")
  @Tags("Users")
  export class UsersController extends Controller {
    @Security("jwt", ["admin"])
    @Get()
    public async getUsers(): Promise<User[]> {
        return new UserService().getAll();
    }
    @Security("jwt")
    @Get("{userId}")
    public async getUser(
    @Path() userId: number): Promise<User> 
    {
        return new UserService().get(userId);
    }
    @Security("jwt")
    @SuccessResponse("204", "User deleted")
    @Delete("{userId}")
    public async deleteUser( @Path() userId: number): Promise<void> {
        this.setStatus(204);
        new UserService().delete(userId);
        return;
    }
  }