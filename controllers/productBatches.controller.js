const { ProductBatch } = require('../models/productBatches.model');

// Crear nuevo batch
const createBatch = async (req, res) => {
    try {
        const newBatch = await ProductBatch.create(req.body);
        res.status(201).json(newBatch);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creando el lote', error });
    }
};

// Obtener todos los batches
const getAllBatches = async (req, res) => {
    try {
        const batches = await ProductBatch.findAll();
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo los lotes', error });
    }
};

// Obtener un batch por ID
const getBatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const batch = await ProductBatch.findByPk(id);
        if (!batch) return res.status(404).json({ message: 'Lote no encontrado' });
        res.status(200).json(batch);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo el lote', error });
    }
};

// Actualizar un batch
const updateBatch = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await ProductBatch.update(req.body, { where: { batch_id: id } });
        if (!updated) return res.status(404).json({ message: 'Lote no encontrado' });
        res.status(200).json({ message: 'Lote actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando el lote', error });
    }
};

// Eliminar un batch
const deleteBatch = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductBatch.destroy({ where: { batch_id: id } });
        if (!deleted) return res.status(404).json({ message: 'Lote no encontrado' });
        res.status(200).json({ message: 'Lote eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando el lote', error });
    }
};

module.exports = {
    deleteBatch,
    updateBatch, createBatch, getAllBatches, getBatchById
}