const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const ProductBatch = bdmysql.define('product_batches', {
    batch_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    products_ean_code: {
        type: DataTypes.STRING(13),
        allowNull: false,
        references: {
            model: 'products',
            key: 'ean_code'
        }
    },
    remaining_quantity: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    expiration_date: DataTypes.DATE,
    manufacture_date: DataTypes.DATE,
    original_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discount_price: DataTypes.DECIMAL(10, 2),
    status: {
        type: DataTypes.ENUM("available", "expired", "sold_out"),
        defaultValue: "available"
    },
    photograph_url: DataTypes.STRING(255),
    notes: DataTypes.TEXT,
    discount_applied: {
        type: DataTypes.BOOLEAN,
    },
    stores_store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "stores",
            key: "store_id"
        }
    },
    quantity: DataTypes.BIGINT
}, {
    tableName: 'product_batches',
    timestamps: false,

    hooks: {
        beforeCreate: (batch) => {
            if (batch.remaining_quantity == null) {
                batch.remaining_quantity = batch.quantity;
            }
        }
    }
});

module.exports = { ProductBatch };
