const express = require("express");
const {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore
} = require("../controllers/stores.controller");

const router = express.Router();

router.get("/", getStores);
router.get("/:id", getStoreById);
router.post("/", createStore);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);

module.exports = router;
