const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection')

const Order = bdmysql.define('orders', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customers_customer_id: {
        type: DataTypes.INTEGER, // Usa CHAR(36) si tu customers usa UUID
        allowNull: false,
        references: {
            model: 'customers',
            key: 'customer_id'
        }
    },
    total_price: {
        type: DataTypes.DECIMAL(12, 2)
    },
    donated_amount: {
        type: DataTypes.DECIMAL(12, 2)
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
        defaultValue: 'pending'
    },
    payment_method: {
        type: DataTypes.ENUM('card', 'cash', 'transfer'),
        defaultValue: 'card'
    },
    payment_status: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        defaultValue: 'pending'
    },
    delivery_address: {
        type: DataTypes.STRING(255)
    },
    delivery_lat: {
        type: DataTypes.DECIMAL(10, 6)
    },
    delivery_lng: {
        type: DataTypes.DECIMAL(10, 6)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fulfilled_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'orders',
    timestamps: false
});



module.exports = Order;
