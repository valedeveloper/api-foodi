const express = require('express');
const router = express.Router();
const {
    orderItemsGet,
    orderItemsGetById,
    orderItemsPost,
    orderItemsPut,
    orderItemsDelete
} = require('../controllers/orderItems.controller.js');
const { validarFKOrderItems, validarStockSuficiente } = require("../middlewares/validacionesFK.js")
router.get('/', orderItemsGet);
router.get('/:id', orderItemsGetById);
router.post('/',
    validarFKOrderItems,
    validarStockSuficiente,
    orderItemsPost);
router.put('/:id',
    validarFKOrderItems,
    validarStockSuficiente,
    orderItemsPut);
router.delete('/:id', orderItemsDelete);

module.exports = router;
