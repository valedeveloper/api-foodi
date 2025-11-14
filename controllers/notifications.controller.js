const { response } = require('express');
const { Notifications } = require('../models/notifications.model');

// Obtener todas las notificaciones
const notificationsGet = async (req, res = response) => {
    try {
        const data = await Notifications.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener notificaciones', error });
    }
};

// Obtener una notificación por ID
const notificationGetById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const notification = await Notifications.findByPk(id);
        if (!notification) return res.status(404).json({ ok: false, msg: 'Notificación no encontrada' });
        res.json({ ok: true, data: notification });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener notificación', error });
    }
};

// Crear una nueva notificación
const notificationPost = async (req, res = response) => {
    const { message, type, is_read, title, created_by, priority, image_url, url_redirect, expires_at } = req.body;

    try {
        const newNotification = await Notifications.create({
            message,
            type,
            is_read,
            title,
            created_by,
            priority,
            image_url,
            url_redirect,
            expires_at
        });

        res.json({ ok: true, msg: 'Notificación creada correctamente', data: newNotification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al crear notificación', error });
    }
};

// Actualizar una notificación
const notificationPut = async (req, res = response) => {
    const { id } = req.params;
    const { message, type, is_read, title, created_by, priority, image_url, url_redirect, expires_at } = req.body;

    try {
        const notification = await Notifications.findByPk(id);
        if (!notification) return res.status(404).json({ ok: false, msg: 'Notificación no encontrada' });

        await notification.update({
            message,
            type,
            is_read,
            title,
            created_by,
            priority,
            image_url,
            url_redirect,
            expires_at
        });

        res.json({ ok: true, msg: 'Notificación actualizada correctamente', data: notification });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar notificación', error });
    }
};

// Eliminar una notificación
const notificationDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const notification = await Notifications.findByPk(id);
        if (!notification) return res.status(404).json({ ok: false, msg: 'Notificación no encontrada' });

        await notification.destroy();
        res.json({ ok: true, msg: 'Notificación eliminada correctamente', data: notification });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar notificación', error });
    }
};

module.exports = {
    notificationsGet,
    notificationGetById,
    notificationPost,
    notificationPut,
    notificationDelete
};
