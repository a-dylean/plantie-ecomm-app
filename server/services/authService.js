const createError = require("http-errors");
const UserModule = require("../models/user");
const UserModuleInstance = new UserModule();
const { compareHash } = require("../utils/helpers");

module.exports = class AuthService {
  async login(data) {
    const { email, password } = data;
    try {
      const user = await UserModuleInstance.findUserByEmail(email);
      const matchedPassword = await compareHash(password, user.password);
      if (!user) {
        throw createError(401, "User not found!");
      }
      if (!matchedPassword) {
        throw createError(401, "Wrong credentials!");
      }
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async register(data) {
    const { email } = data;
    try {
      const userExists = await UserModuleInstance.findUserByEmail(email);
      if (userExists) {
        throw createError(409, "User with such email already exists!");
      }
      return await UserModuleInstance.create(data);
    } catch (err) {
      throw createError(500, err);
    }
  }
};
