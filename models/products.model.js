const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Products = bdmysql.define('products', {
    ean_code: {
        type: DataTypes.STRING(13),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(100)
    },
    description: {
        type: DataTypes.TEXT
    },
    image_url: {
        type: DataTypes.STRING(255)
    },
    unit_measure: {
        type: DataTypes.STRING(20)
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    categories_category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'category_id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { Products };
