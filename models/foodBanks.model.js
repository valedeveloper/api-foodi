const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const FoodBanks = bdmysql.define('food_banks', {
    foodbank_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { FoodBanks };
