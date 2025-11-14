const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Notifications = bdmysql.define('notifications', {
    notification_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('order', 'promotion', 'system', 'donation'),
        defaultValue: 'system'
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'low'
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    url_redirect: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { Notifications };
