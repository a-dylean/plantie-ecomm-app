const express = require('express');
const ProductService = require('../../services/productService');
const pool = require("../../db/database");
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
    const {name, description, price, available, category_id} = req.body;
    try {
        const newProduct = await ProductServiceInstance.register({ name, description, price, available, category_id });
        res.status(200).send(newProduct);
    } catch (err) {
        res.status(500).json({ message: "ERROR"});
}}
);


//get a product
productsRouter.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const selectedProduct = await ProductServiceInstance.get({ id: productId });
        res.status(200).send(selectedProduct);
    } catch (err) {
        res.status(500).json({ message: "ERROR" });
    }
});

//update a product
productsRouter.put('/:productId', async(req, res) => {
    try {
        const { productId } = req.params;
        const { data } = req.body;
        const updatedProduct = await ProductServiceInstance.update({ id: productId, ...data});
        res.status(200).send(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: "ERROR"});
    }
});

//delete a product
productsRouter.delete('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const deleteProduct = await ProductServiceInstance.delete({ id: productId });
        res.status(204).send(deleteProduct);
    } catch (err) {
        res.status(500).json({ message: "ERROR"});

    }
});

//retrieve products by category
productsRouter.get('/?category={categoryId}', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const selectedProducts = await ProductServiceInstance.filter({ category_id: categoryId });
        res.status(200).send(selectedProducts);
    } catch (err) {
        res.status(500).json({ message: "ERROR"});
    }

});

module.exports = productsRouter;

