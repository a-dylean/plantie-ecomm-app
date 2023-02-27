const express = require("express");
const pool = require("../../db/database");
usersRouter = express.Router();
const UserService = require("../../services/userService");
const UserServiceInstance = new UserService();

usersRouter.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query(`SELECT * FROM users`);
    res.json(allUsers.rows);
  } catch (err) {
    res.status(500).json({ message: "ERROR" });
  }
});

usersRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await UserServiceInstance.get({ id: userId });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).json({ message: "ERROR" });
  }
});

usersRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const response = await UserServiceInstance.update({ id: userId, ...data });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).json({ message: "ERROR" });
  }
});

module.exports = usersRouter;
