const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Donations = bdmysql.define('donations', {
    donation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    donation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    food_banks_foodbank_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orders_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    donation_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { Donations };
