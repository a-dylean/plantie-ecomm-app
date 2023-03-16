import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export class UserModel {
  async create(data: User): Promise<User> {
    return await prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password
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
        email: email != null ? email : undefined,
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
