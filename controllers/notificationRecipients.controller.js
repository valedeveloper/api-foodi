const { response } = require('express');
const { NotificationRecipients } = require('../models/notificationRecipients.model');

// Obtener todos los registros
const notificationRecipientsGet = async (req, res = response) => {
    try {
        const data = await NotificationRecipients.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener destinatarios de notificaciones', error });
    }
};

// Obtener un registro por ID
const notificationRecipientGetById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const record = await NotificationRecipients.findByPk(id);
        if (!record) return res.status(404).json({ ok: false, msg: 'Destinatario no encontrado' });
        res.json({ ok: true, data: record });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener destinatario', error });
    }
};

// Crear un nuevo registro
const notificationRecipientPost = async (req, res = response) => {
    const { customer_id, notification_id, is_read, read_at, sent_at, deleted } = req.body;
    try {
        const newRecipient = await NotificationRecipients.create({
            customer_id,
            notification_id,
            is_read,
            read_at,
            sent_at,
            deleted
        });
        res.json({ ok: true, msg: 'Destinatario creado correctamente', data: newRecipient });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al crear destinatario', error });
    }
};

// Actualizar un registro
const notificationRecipientPut = async (req, res = response) => {
    const { id } = req.params;
    const { is_read, read_at, sent_at, deleted } = req.body;
    try {
        const record = await NotificationRecipients.findByPk(id);
        if (!record) return res.status(404).json({ ok: false, msg: 'Destinatario no encontrado' });

        await record.update({ is_read, read_at, sent_at, deleted });
        res.json({ ok: true, msg: 'Destinatario actualizado correctamente', data: record });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar destinatario', error });
    }
};

// Eliminar (borrado lógico)
const notificationRecipientDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const record = await NotificationRecipients.findByPk(id);
        if (!record) return res.status(404).json({ ok: false, msg: 'Destinatario no encontrado' });

        await record.update({ deleted: true });
        res.json({ ok: true, msg: 'Destinatario marcado como eliminado', data: record });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar destinatario', error });
    }
};

module.exports = {
    notificationRecipientsGet,
    notificationRecipientGetById,
    notificationRecipientPost,
    notificationRecipientPut,
    notificationRecipientDelete
};
