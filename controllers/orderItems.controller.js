const { response, request } = require("express");
const { OrderItems } = require("../models/orderItems.model");
const { Order } = require("../models/orders.model");
const { ProductBatch } = require("../models/productBatches.model");



// GET ALL
const orderItemsGet = async (req, res = response) => {
    try {
        const items = await OrderItems.findAll();
        res.json({ ok: true, data: items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Error al obtener order_items", error });
    }
};


// GET BY ID
const orderItemsGetById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const item = await OrderItems.findByPk(id);

        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: `No existe order_item con id ${id}`
            });
        }

        res.json({ ok: true, data: item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Error interno", error });
    }
};


// POST
const orderItemsPost = async (req, res = response) => {
    const { orders_order_id, product_batches_batch_id, quantity, unit_price, subtotal } = req.body;

    console.log("El product_batches_batch_id", product_batches_batch_id)
    console.log("El orders_order_id", orders_order_id)
    try {
        // Validaciones de existencia


        const order = await Order.findByPk(orders_order_id);
        const batch = await ProductBatch.findByPk(product_batches_batch_id);

        if (!order || !batch) {
            return res.status(400).json({
                ok: false,
                msg: "La orden o el batch especificado no existen"
            });
        }

        const newItem = await OrderItems.create({
            orders_order_id,
            product_batches_batch_id,
            quantity,
            unit_price,
            subtotal
        });

        res.status(201).json({
            ok: true,
            msg: "OrderItem creado correctamente",
            data: newItem
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Error interno", error });
    }
};


// PUT
const orderItemsPut = async (req, res = response) => {
    const { id } = req.params;
    const { orders_order_id, product_batches_batch_id, quantity, unit_price, subtotal } = req.body;

    try {
        const item = await OrderItems.findByPk(id);

        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: `No existe order_item con id ${id}`
            });
        }

        const order = await Orders.findByPk(orders_order_id);
        const batch = await ProductBatches.findByPk(product_batches_batch_id);

        if (!order || !batch) {
            return res.status(400).json({
                ok: false,
                msg: "La orden o el batch especificado no existen"
            });
        }

        await item.update({
            orders_order_id,
            product_batches_batch_id,
            quantity,
            unit_price,
            subtotal
        });

        res.json({ ok: true, msg: "OrderItem actualizado", data: item });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Error interno", error });
    }
};


// DELETE
const orderItemsDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const item = await OrderItems.findByPk(id);

        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: `No existe order_item con id ${id}`
            });
        }

        await item.destroy();

        res.json({ ok: true, msg: "OrderItem eliminado", data: item });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Error interno", error });
    }
};


module.exports = {
    orderItemsGet,
    orderItemsGetById,
    orderItemsPost,
    orderItemsPut,
    orderItemsDelete
};
