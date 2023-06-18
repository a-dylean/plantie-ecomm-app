import { PrismaClient, User } from "@prisma/client";
import { generateHash } from "../../helpers/bcrypt";
import { stripe } from "../orders/controller";

const prisma = new PrismaClient();

export type UserCreationParams = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string | null;
  password: string;
};
export type UserLoginParams = {
  email: string;
  password: string;
};

export class UserModel {
  async createUser(): Promise<User> {
    return await prisma.user.create({
      data: {},
    });
  }
  async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }
  async update(id: number, data: Partial<User>): Promise<User> {
    const { password, address, phone, email, surname, name } = data;
    const hashedPassword = await generateHash(password || "");
    const customer = await stripe.customers.create({
      email: email || "",
    });
    return await prisma.user.upsert({
      where: {
        id: id,
      },
      update: {
        password: hashedPassword,
        address: address,
        phone: phone,
        email: email,
        surname: surname,
        name: name,
        fullProfile: true,
        stripeId: customer.id,
      },
      create: {
        password: hashedPassword,
        address: address,
        phone: phone,
        email: email,
        surname: surname,
        name: name,
        fullProfile: true,
        stripeId: customer.id,
      },
    });
  }
  async findUserByEmail(email: string): Promise<User | null> {
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
