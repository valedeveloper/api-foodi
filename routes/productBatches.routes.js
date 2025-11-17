const express = require('express');
const {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch
} = require('../controllers/productBatches.controller');
const { validarFKBatch } = require('../middlewares/validacionesFK');
const { validarCampos } = require("../middlewares/validar-campos")
const router = express.Router();
router.get('/', getAllBatches);
router.get('/:id', getBatchById);
router.post('/',
    validarCampos,
    validarFKBatch,
    createBatch);
router.put('/:id',
    validarCampos,
    validarFKBatch,
    updateBatch);
router.delete('/:id', deleteBatch);

module.exports = router;
