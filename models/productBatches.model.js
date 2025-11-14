const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection')
const { Store } = require('./stores.model');

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
        type: DataTypes.BIGINT
    },
    expiration_date: {
        type: DataTypes.DATE
    },
    manufacture_date: {
        type: DataTypes.DATE
    },
    original_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discount_price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    status: {
        type: DataTypes.ENUM('available', 'expired', 'sold_out'),
        defaultValue: 'available'
    },
    photograph_url: {
        type: DataTypes.STRING(255)
    },
    notes: {
        type: DataTypes.TEXT
    },
    discount_applied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    stores_store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'stores',
            key: 'store_id'
        }
    },
    quantity: {
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'product_batches',
    timestamps: false
});

module.exports = ProductBatch;
