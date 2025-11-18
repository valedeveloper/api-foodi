const express = require('express');
const {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch,

    // Nuevos controladores
    getStockTotal,
    getBatchesExpiringSoon,
    getExpiredBatches
} = require('../controllers/productBatches.controller');

const { validarFKBatch } = require('../middlewares/validacionesFK');
const { validarCampos } = require("../middlewares/validar-campos");

const router = express.Router();

// ===========================
// Rutas existentes
// ===========================
router.get('/', getAllBatches);
router.get('/:id', getBatchById);
router.post('/', validarFKBatch, createBatch);
router.put('/:id', validarCampos, validarFKBatch, updateBatch);
router.delete('/:id', deleteBatch);

// ===========================
// Nuevas rutas
// ===========================
router.get('/analytics/stock-total', getStockTotal);

router.get('/analytics/expiring-soon', getBatchesExpiringSoon);

router.get('/analytics/expired', getExpiredBatches);

module.exports = router;
