const createError = require("http-errors");
const ProductModel = require("../db/models/product");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async get(data) {
    const { id } = data;
    try {
      const product = await ProductModelInstance.findProductById(id);
      if (!product) {
        throw createError(404, "Plant not found!");
      }
      return product;
    } catch (err) {
      throw err;
    }
  }
  async getAll() {
    try {
      const allProducts = await ProductModelInstance.getAll();
      return allProducts;
    } catch (err) {
      throw err;
    }
  }
  async update(data) {
    try {
      const product = await ProductModelInstance.update(data);
      return product;
    } catch (err) {
      throw err;
    }
  }
  //get products by category
  async filter(data) {
    const { category_id } = data;
    try {
      const products = await ProductModelInstance.findProductsByCategory(
        category_id
      );
      if (!products) {
        throw createError(404, "Plants not found!");
      }
      return products;
    } catch (err) {
      throw err;
    }
  }
  async register(data) {
    try {
      return await ProductModelInstance.create(data);
    } catch (err) {
      throw createError(500, err);
    }
  }
  async delete(data) {
    const { id } = data;
    try {
      return await ProductModelInstance.deleteProductById(id);
    } catch (err) {
      throw createError(500, err);
    }
  }
};
