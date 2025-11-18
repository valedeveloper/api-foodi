const { bdmysql } = require("../database/mySqlConnection");
const { Stores } = require("../models/stores.model");

// Obtener todas las tiendas
const getStores = async (req, res) => {
    try {
        const stores = await Stores.findAll();
        res.json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tiendas" });
    }
};

// Obtener tienda por ID
const getStoreById = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Stores.findByPk(id);
        if (!store) return res.status(404).json({ message: "Tienda no encontrada" });
        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la tienda" });
    }
};

// Crear tienda
// Crear tienda
const createStore = async (req, res) => {
    const { nit } = req.body;

    try {
        // Validar NIT no repetido
        const existeNit = await Stores.findOne({
            where: { nit }
        });

        if (existeNit) {
            return res.status(400).json({
                error: `Ya existe una tienda con el NIT: ${nit}`
            });
        }

        // Crear tienda
        const store = await Stores.create(req.body);
        res.status(201).json(store);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al crear la tienda"
        });
    }
};


// Actualizar tienda
const updateStore = async (req, res) => {
    const { id, nit } = req.params;
    try {

        const store = await Stores.findByPk(id);
        if (!store) return res.status(404).json({ message: "Tienda no encontrada" });

        const existeNit = await Stores.findOne({
            where: { nit }
        });

        if (existeNit) {
            return res.status(400).json({
                error: `Ya existe una tienda con el NIT: ${nit}`
            });
        }

        await store.update(req.body);
        res.json({ message: "Tienda actualizada correctamente", store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la tienda" });
    }
};

// Eliminar tienda
const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Stores.findByPk(id);
        if (!store) return res.status(404).json({ message: "Tienda no encontrada" });

        await store.destroy();
        res.json({ message: "Tienda eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la tienda" });
    }
};

// Productos vendidos por tienda
const getProductsSoldByStore = async (req, res) => {
    try {
        const [rows] = await bdmysql.query(`
            SELECT s.name AS tienda, p.name AS producto, SUM(oi.quantity) AS total_vendido
            FROM order_items oi
            JOIN product_batches pb ON pb.batch_id = oi.product_batches_batch_id
            JOIN products p ON p.ean_code = pb.products_ean_code
            JOIN stores s ON pb.stores_store_id = s.store_id
            GROUP BY s.store_id, p.ean_code;
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener productos vendidos por tienda" });
    }
};

// Stock por tienda
const getStockByStore = async (req, res) => {
    try {
        const [rows] = await bdmysql.query(`
            SELECT s.name AS tienda, p.name AS producto, SUM(pb.remaining_quantity) AS stock
            FROM stores s
            JOIN product_batches pb ON pb.stores_store_id = s.store_id
            JOIN products p ON p.ean_code = pb.products_ean_code
            GROUP BY s.store_id, p.ean_code;
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener stock por tienda" });
    }
};


module.exports = {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore,
    getProductsSoldByStore,
    getStockByStore
};
