const { bdmysql } = require('../database/mySqlConnection')

const OrderItem = {
    getAll: (callback) => {
        const sql = `
            SELECT 
                oi.orderitem_id,
                oi.orders_order_id,
                oi.product_batches_batch_id,
                oi.quantity,
                oi.unit_price,
                oi.subtotal,
                oi.created_at,
                o.customers_customer_id,
                pb.products_ean_code
            FROM order_items oi
            JOIN orders o ON oi.orders_order_id = o.order_id
            JOIN product_batches pb ON oi.product_batches_batch_id = pb.batch_id;
        `;
        bdmysql.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = 'SELECT * FROM order_items WHERE orderitem_id = ?';
        bdmysql.query(sql, [id], callback);
    },

    create: (orderItemData, callback) => {
        const sql = `
            INSERT INTO order_items 
            (orders_order_id, product_batches_batch_id, quantity, unit_price, subtotal)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            orderItemData.orders_order_id,
            orderItemData.product_batches_batch_id,
            orderItemData.quantity,
            orderItemData.unit_price,
            orderItemData.subtotal
        ];
        bdmysql.query(sql, values, callback);
    },

    update: (id, orderItemData, callback) => {
        const sql = `
            UPDATE order_items 
            SET orders_order_id = ?, 
                product_batches_batch_id = ?, 
                quantity = ?, 
                unit_price = ?, 
                subtotal = ?
            WHERE orderitem_id = ?
        `;
        const values = [
            orderItemData.orders_order_id,
            orderItemData.product_batches_batch_id,
            orderItemData.quantity,
            orderItemData.unit_price,
            orderItemData.subtotal,
            id
        ];
        bdmysql.query(sql, values, callback);
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM order_items WHERE orderitem_id = ?';
        bdmysql.query(sql, [id], callback);
    }
};

module.exports = OrderItem;
