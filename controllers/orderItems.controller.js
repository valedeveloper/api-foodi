const OrderItem = require('../models/orderItems.model');

const orderItemController = {
    getAll: (req, res) => {
        OrderItem.getAll((err, results) => {
            if (err) {
                console.error('Error obteniendo order_items:', err);
                return res.status(500).json({ error: 'Error al obtener los order_items' });
            }
            res.json(results);
        });
    },

    getById: (req, res) => {
        const id = req.params.id;
        OrderItem.getById(id, (err, results) => {
            if (err) {
                console.error('Error obteniendo order_item:', err);
                return res.status(500).json({ error: 'Error al obtener el order_item' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Order item no encontrado' });
            }
            res.json(results[0]);
        });
    },

    create: (req, res) => {
        const data = req.body;
        if (!data.orders_order_id || !data.product_batches_batch_id || !data.quantity || !data.unit_price) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        data.subtotal = data.quantity * data.unit_price;

        OrderItem.create(data, (err, result) => {
            if (err) {
                console.error('Error creando order_item:', err);
                return res.status(500).json({ error: 'Error al crear el order_item' });
            }
            res.status(201).json({ message: 'Order item creado correctamente', orderitem_id: result.insertId });
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        data.subtotal = data.quantity * data.unit_price;

        OrderItem.update(id, data, (err) => {
            if (err) {
                console.error('Error actualizando order_item:', err);
                return res.status(500).json({ error: 'Error al actualizar el order_item' });
            }
            res.json({ message: 'Order item actualizado correctamente' });
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        OrderItem.delete(id, (err) => {
            if (err) {
                console.error('Error eliminando order_item:', err);
                return res.status(500).json({ error: 'Error al eliminar el order_item' });
            }
            res.json({ message: 'Order item eliminado correctamente' });
        });
    }
};

module.exports = orderItemController;
