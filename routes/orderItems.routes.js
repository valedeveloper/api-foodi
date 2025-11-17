const express = require('express');
const router = express.Router();
const {
    orderItemsGet,
    orderItemsGetById,
    orderItemsPost,
    orderItemsPut,
    orderItemsDelete
} = require('../controllers/orderItems.controller.js');
const { validarCampos } = require("../middlewares/validar-campos.js")
const { validarFKOrderItems } = require("../middlewares/validacionesFK.js")
router.get('/', orderItemsGet);
router.get('/:id', orderItemsGetById);
router.post('/',
    validarCampos,
    validarFKOrderItems,
    orderItemsPost);
router.put('/:id',
    validarCampos,
    validarFKOrderItems,
    orderItemsPut);
router.delete('/:id', orderItemsDelete);

module.exports = router;
