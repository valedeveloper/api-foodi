const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const NotificationRecipients = bdmysql.define('notification_recipients', {
    recipient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'customer_id'
        }
    },
    notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'notifications',
            key: 'notification_id'
        }
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    read_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { NotificationRecipients };
