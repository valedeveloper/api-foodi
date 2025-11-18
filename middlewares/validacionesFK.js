const { validarCategoriaExiste, validarStoreExiste, validarProductoExiste, validarClienteExiste, validarOrdenExiste, validarBatchExiste } = require("../helpers/index");
const { ProductBatch } = require("../models");

const validarFKProducto = async (req, res, next) => {
    try {
        await validarCategoriaExiste(req.body.categories_category_id);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const validarFKBatch = async (req, res, next) => {
    const { stores_store_id, products_ean_code } = req.body
    console.log(stores_store_id, products_ean_code);

    try {
        await validarStoreExiste(req.body.stores_store_id);
        await validarProductoExiste(parseInt(req.body.products_ean_code));
        next();
    } catch (error) {
        console.log("El error es de aqui")
        res.status(400).json({ error: error.message });
    }
};

const validarFKOrder = async (req, res, next) => {

    try {
        await validarClienteExiste(req.body.customers_customer_id);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const validarFKOrderItems = async (req, res, next) => {
    console.log("BODY EN ORDER_ITEMS:", req.body);

    try {
        await validarOrdenExiste(req.body.orders_order_id);
        await validarBatchExiste(req.body.product_batches_batch_id);
        console.log("Llego aca");

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const validarStockSuficiente = async (req, res, next) => {

    const { product_batches_batch_id, quantity } = req.body;


    try {

        const batch = await ProductBatch.findByPk(product_batches_batch_id);

        if (!batch) {
            return res.status(404).json({ error: "Batch no encontrado." });
        }

        if (batch.remaining_quantity < quantity) {
            return res.status(400).json({
                error: `Stock insuficiente. Disponible: ${batch.remaining_quantity}`
            });
        }

        next();
    } catch (error) {

        res.status(500).json({ error: error });
    }
};


module.exports = { validarFKProducto, validarFKBatch, validarFKOrder, validarFKOrderItems, validarStockSuficiente }

