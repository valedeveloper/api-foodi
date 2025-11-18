const express = require("express");
const {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore,
    getProductsSoldByStore,
    getStockByStore
} = require("../controllers/stores.controller");

const router = express.Router();

// Rutas principales
router.get("/", getStores);
router.get("/:id", getStoreById);
router.post("/", createStore);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);

// ===============================
// RUTAS ANALYTICS STORES
// ===============================
router.get("/analytics/products-sold", getProductsSoldByStore);
router.get("/analytics/stock", getStockByStore);

module.exports = router;
