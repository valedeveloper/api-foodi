const { Router } = require('express');
const {
    productsGet,
    productByIdGet,
    productPost,
    productPut,
    productDelete
} = require('../controllers/products.controller');
const { validarFKProducto } = require('../middlewares/validacionesFK');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Endpoints
router.get('/', productsGet);
router.get('/:ean_code', productByIdGet);
router.post('/',
    validarCampos,
    validarFKProducto,
    productPost);
router.put('/:ean_code',
    validarCampos,
    validarFKProducto,
    productPut);
router.delete('/:ean_code', productDelete);

module.exports = router;
