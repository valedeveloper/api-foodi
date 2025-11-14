const Store = require("../models/stores.model");

// Obtener todas las tiendas
const getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
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
        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: "Tienda no encontrada" });
        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la tienda" });
    }
};

// Crear tienda
const createStore = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(201).json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la tienda" });
    }
};

// Actualizar tienda
const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: "Tienda no encontrada" });

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
        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: "Tienda no encontrada" });

        await store.destroy();
        res.json({ message: "Tienda eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la tienda" });
    }
};

module.exports = {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore
};
