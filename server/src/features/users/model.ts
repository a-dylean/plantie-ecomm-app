import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export type UserCreationParams = Pick<
  User,
  "name" | "surname" | "email" | "phone" | "address" | "password" | "role"
>;

export type UserAuthenticationParams = Pick<
  User,
  "name" | "email" | "id" | "role"
>;

export type UserLoginParams = Pick<
  User,
  "email" | "password"
>;

export class UserModel {
  async create(data: UserCreationParams): Promise<User> {
    return await prisma.user.create({
      data: {
        ...data,
        verified: true
      },
    });
  }
  async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }
  async update(data: User): Promise<User> {
    const { id, ...params } = data;
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
  }
  async findUserByEmail(email: User["email"]): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findUserById(id: User["id"]): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  async deleteUserById(id: User["id"]): Promise<void> {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
