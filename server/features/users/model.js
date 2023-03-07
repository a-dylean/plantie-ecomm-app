const { PrismaClient } = require("@prisma/client");
const e = require("cors");
const prisma = new PrismaClient();
module.exports = class UserModel {
  async create(data) {
    try {
      const result = await prisma.user.create({
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          address: data.address,
          password: data.password,
          createdAt: data.createdAt,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAll() {
    try {
      const result = await prisma.user.findMany();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async update(data) {
    try {
      const { id, ...params } = data;
      const result = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          ...params,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUserByEmail(email) {
    try {
      const result = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUserById(id) {
    try {
      const result = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteUserById(id) {
    try {
      const result = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      if (result) {
        return "User has been deleted!";
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
