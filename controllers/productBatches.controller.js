const { bdmysql } = require('../database/mySqlConnection');
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

// STOCK TOTAL POR PRODUCTO
const getStockTotal = async (req, res) => {
    try {
        const [rows] = await bdmysql.query(`
            SELECT p.ean_code, p.name, 
                   SUM(pb.remaining_quantity) AS stock_total
            FROM products p
            LEFT JOIN product_batches pb 
                ON pb.products_ean_code = p.ean_code
            GROUP BY p.ean_code, p.name;
        `);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo stock total', error });
    }
};

// LOTES PRÓXIMOS A VENCER (< 7 días)
const getBatchesExpiringSoon = async (req, res) => {
    try {
        const [rows] = await bdmysql.query(`
            SELECT pb.batch_id, p.name, pb.expiration_date
            FROM product_batches pb
            JOIN products p ON p.ean_code = pb.products_ean_code
            WHERE pb.expiration_date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
              AND pb.status = 'available';
        `);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo lotes próximos a vencer', error });
    }
};

// LOTES VENCIDOS
const getExpiredBatches = async (req, res) => {
    try {
        const [rows] = await bdmysql.query(`
            SELECT pb.batch_id, p.name, pb.expiration_date
            FROM product_batches pb
            JOIN products p ON p.ean_code = pb.products_ean_code
            WHERE pb.expiration_date < CURDATE()
            ORDER BY pb.expiration_date DESC;
        `);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo lotes vencidos', error });
    }
};
module.exports = {
    deleteBatch,
    updateBatch, createBatch, getAllBatches, getBatchById, getStockTotal, getExpiredBatches, getBatchesExpiringSoon
}