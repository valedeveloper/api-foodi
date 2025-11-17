const { validarCategoriaExiste, validarStoreExiste, validarProductoExiste, validarClienteExiste, validarOrdenExiste, validarBatchExiste } = require("../helpers/index")

const validarFKProducto = async (req, res, next) => {
    try {
        await validarCategoriaExiste(req.body.categories_category_id);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const validarFKBatch = async (req, res, next) => {


    try {
        await validarStoreExiste(req.body.stores_store_id);
        await validarProductoExiste(req.body.products_ean_code);
        next();
    } catch (error) {
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
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const validarStockSuficiente = async (req, res, next) => {
    try {
        const { product_batches_batch_id, quantity } = req.body;

        const batch = await ProductBatches.findByPk(product_batches_batch_id);

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
        res.status(500).json({ error: "Error al validar stock." });
    }
};


module.exports = { validarFKProducto, validarFKBatch, validarFKOrder, validarFKOrderItems }

