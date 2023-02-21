const express = require('express');
const pool = require("../database");

categoriesRouter = express.Router();

//create a category
categoriesRouter.post('/', async (req, res) => {
    try {
        const {category_name} = req.body;
        const newCategory = await pool.query(
            "INSERT INTO categories (category_name) VALUES ($1) RETURNING *", [category_name]
        );

        res.json(newCategory.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});

//get all categories
categoriesRouter.get('/', async (req, res, next) => {
    try {
        const allCategories = await pool.query("SELECT * FROM categories");
        res.json(allCategories.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = categoriesRouter;