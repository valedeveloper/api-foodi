const express = require('express');
const router = express.Router();
const { validarCampos } = require("../middlewares/validar-campos")
const { validarFKOrder } = require("../middlewares/validacionesFK")
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orders.controller');

router.post('/',
    validarCampos,
    validarFKOrder,
    createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id',
    validarCampos,
    validarFKOrder,
    updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
