const pool = require("../database");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrderModel {
  async getAll() {
    try {
      const statement = `SELECT * FROM orders`;
      const result = await pool.query(statement);
      if (result.rows?.length) {
        return result.rows;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "orders") + "RETURNING *";
      const result = await pool.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findOrderById(id) {
    try {
      const statement = `SELECT * FROM orders WHERE id = $1`;
      const values = [id];
      const result = await pool.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
