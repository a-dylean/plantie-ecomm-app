const pool = require("../database");
const pgp = require("pg-promise")({ capSQL: true});

module.exports = class ProductModel {
    async create(data) {
        try {
            const statement = pgp.helpers.insert(data, null, "products") + "RETURNING *";
            const result = await pool.query(statement);
      
            if (result.rows?.length) {
              return result.rows[0];
            }
      
            return null;
          } catch (err) {
            throw new Error(err);
          }
    }

    async update(data) {
        try {
            const { id, ...params } = data;
      
            const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
            const statement = pgp.helpers.update(params, null, "products") + condition;
      
            const result = await pool.query(statement);
      
            if (result.rows?.length) {
              return result.rows[0];
            }
      
            return null;
          } catch (err) {
            throw new Error(err);
          }
    }

    async findProductsByCategory(category_id) {
        try {
          const statement = `SELECT * FROM products WHERE category_id = $1`;
          const values = [category_id];
    
          const result = await pool.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0];
          }
    
          return null;
        } catch (err) {
          throw new Error(err);
        }
    }

    async findProductById(id) {
        try {
          const statement = `SELECT * FROM products WHERE id = $1`;
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

    async deleteProductById(id) {
      try {
        const statement = `DELETE FROM products WHERE id = $1`;
        const values = [id];
        const result = await pool.query(statement, values);
        if (result) {
        return "Product has been deleted!";
        }
        return null;
      } catch(err) {
        throw new Error(err);
      }
    }
};