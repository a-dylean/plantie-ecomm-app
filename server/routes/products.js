const express = require('express');
const pool = require("../database");

productsRouter = express.Router();

productsRouter.get('/products', async (req, res, next) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = productsRouter;

