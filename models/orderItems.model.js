const { DataTypes } = require("sequelize");
const { bdmysql } = require("../database/mySqlConnection");

const OrderItems = bdmysql.define("order_items", {
    orderitem_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orders_order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "orders_order_id",
        references: {
            model: "orders",
            key: "order_id"
        }
    },
    product_batches_batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_batches_batch_id",
        references: {
            model: "product_batches",
            key: "batch_id"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { OrderItems };
