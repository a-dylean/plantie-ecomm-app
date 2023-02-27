const express = require("express");
const OrderService = require('../../services/orderService');
const pool = require('../../db/database');
ordersRouter = express.Router();
const OrderServiceInstance = new OrderService();

ordersRouter.get('/', async (req, res, next) => {
    try {
        const allOrders = await pool.query("SELECT * FROM orders");
        res.json(allOrders.rows);
    } catch (err) {
        res.status(500).json({ message: "ERROR" });
    }
});

ordersRouter.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const selectedOrder = await OrderServiceInstance.get({ id: orderId});
        res.status(200).send(selectedOrder);
    } catch (err) {
        res.status(500).json({ message: "ERROR"});
    }
});

module.exports = ordersRouter;