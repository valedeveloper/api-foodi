const Order = require('../models/orders.model');

// 📦 Crear pedido
const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).json({ message: 'Error al crear el pedido', error });
    }
};

// 📋 Obtener todos los pedidos
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
};

// 🔍 Obtener un pedido por ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json(order);
    } catch (error) {
        console.error('Error al obtener pedido:', error);
        res.status(500).json({ message: 'Error al obtener pedido', error });
    }
};

// ✏️ Actualizar pedido
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Order.update(req.body, { where: { order_id: id } });
        if (!updated) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json({ message: 'Pedido actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        res.status(500).json({ message: 'Error al actualizar pedido', error });
    }
};

// 🗑️ Eliminar pedido
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.destroy({ where: { order_id: id } });
        if (!deleted) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        res.status(500).json({ message: 'Error al eliminar pedido', error });
    }
};

module.exports = {
    getOrders, getOrderById, createOrder, updateOrder, deleteOrder
}