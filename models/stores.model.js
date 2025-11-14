const { DataTypes } = require("sequelize");
const { bdmysql } = require('../database/mySqlConnection')

const Store = bdmysql.define(
    "stores",
    {
        store_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        location_lat: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: true
        },
        location_lng: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        owner_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        owner_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        nit: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        logo_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "stores",
        timestamps: false
    }
);

module.exports = Store;
