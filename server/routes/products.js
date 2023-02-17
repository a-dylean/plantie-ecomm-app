const express = require('express');
const pool = require("../database");

productsRouter = express.Router();

//create a product
productsRouter.post('/', async (req, res) => {
    try {
        const {name, description, price, available, category_id} = req.body;
        const newProduct = await pool.query(
            "INSERT INTO products (name, description, price, available) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, description, price, available, category_id]
        );

        res.json(newProduct.rows[0])
    } catch (err) {
        console.error(err.message);
    }
    console.log(req.body)
});

//get all products
productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = productsRouter;

