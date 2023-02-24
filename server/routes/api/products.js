const express = require('express');
const ProductService = require('../../services/productService');
//const pool = require("../../db/database");
productsRouter = express.Router();
const ProductServiceInstance = new ProductService();

//get all products
productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows);
    } catch (err) {
        res.status(500).json({ message: "ERROR" });
    }
});

//create a product
productsRouter.post('/', async (req, res) => {
    try {
        const {name, description, price, available, category_id} = req.body;
        const newProduct = await pool.query(
            "INSERT INTO products (name, description, price, available, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, description, price, available, category_id]
        );

        res.json(newProduct.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});



//get a product
productsRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const selectedProduct = await pool.query("SELECT * FROM products WHERE id = $1", [id]
        );
        res.json(selectedProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a product
productsRouter.put('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {name, description, price, available, category_id} = req.body;
        const updateProduct = await pool.query(
            "UPDATE products SET name = $1, description = $2, price = $3, available = $4, category_id = $5 WHERE id = $6", [name, description, price, available, category_id, id]
        );

        res.json("Product has been updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a product
productsRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteProduct = await pool.query("DELETE FROM products WHERE id = $1", [id]);
        res.json("Product has been deleted!")
    } catch (err) {
        console.error(err.message);

    }
});

module.exports = productsRouter;

