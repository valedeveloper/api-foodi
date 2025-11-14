const { Router } = require('express');
const {
    productsGet,
    productByIdGet,
    productPost,
    productPut,
    productDelete
} = require('../controllers/products.controller');

const router = Router();

// Endpoints
router.get('/', productsGet);
router.get('/:ean_code', productByIdGet);
router.post('/', productPost);
router.put('/:ean_code', productPut);
router.delete('/:ean_code', productDelete);

module.exports = router;
