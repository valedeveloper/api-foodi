const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Categories = bdmysql.define('categories', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { Categories };
