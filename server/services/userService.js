const createError = require("http-errors");
const UserModel = require("../db/models/user");
const UserModelInstance = new UserModel();

module.exports = class UserService {
  async get(data) {
    const { id } = data;
    try {
      const user = await UserModelInstance.findUserById(id);
      if (!user) {
        throw createError(404, "User record not found!");
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
  async update(data) {
    try {
      const user = await UserModelInstance.update(data);
      return user;
    } catch (err) {
      throw err;
    }
  }
  async delete(data) {
    const { id } = data;
    try {
      return await UserModelInstance.deleteUserById(id);
    } catch (err) {
      throw createError(500, err);
    }
  }
};
