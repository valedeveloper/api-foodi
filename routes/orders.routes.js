const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orders.controller');

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
