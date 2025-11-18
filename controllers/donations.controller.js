const { response } = require('express');
const { Donations } = require('../models/donations.model');
const { bdmysql } = require('../database/mySqlConnection');

// Obtener todas las donaciones
const donationsGet = async (req, res = response) => {
    try {
        const data = await Donations.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener donaciones', error });
    }
};

// Obtener una donación por ID
const donationGetById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const donation = await Donations.findByPk(id);
        if (!donation) return res.status(404).json({ ok: false, msg: 'Donación no encontrada' });
        res.json({ ok: true, data: donation });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener donación', error });
    }
};

// Crear una nueva donación
const donationPost = async (req, res = response) => {
    const { donation_date, notes, food_banks_foodbank_id, orders_order_id, donation_amount } = req.body;

    try {
        const newDonation = await Donations.create({
            donation_date,
            notes,
            food_banks_foodbank_id,
            orders_order_id,
            donation_amount
        });

        res.json({ ok: true, msg: 'Donación registrada correctamente', data: newDonation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al registrar donación', error });
    }
};

// Actualizar una donación
const donationPut = async (req, res = response) => {
    const { id } = req.params;
    const { donation_date, notes, food_banks_foodbank_id, orders_order_id, donation_amount } = req.body;

    try {
        const donation = await Donations.findByPk(id);
        if (!donation) return res.status(404).json({ ok: false, msg: 'Donación no encontrada' });

        await donation.update({
            donation_date,
            notes,
            food_banks_foodbank_id,
            orders_order_id,
            donation_amount
        });

        res.json({ ok: true, msg: 'Donación actualizada correctamente', data: donation });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar donación', error });
    }
};

// Eliminar una donación
const donationDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const donation = await Donations.findByPk(id);
        if (!donation) return res.status(404).json({ ok: false, msg: 'Donación no encontrada' });

        await donation.destroy();
        res.json({ ok: true, msg: 'Donación eliminada correctamente', data: donation });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar donación', error });
    }
};
// Total donado por mes
const getDonationsByMonth = async (req, res) => {
    try {
        const [rows] = await bdmysql.query(`
            SELECT 
                DATE_FORMAT(donation_date, '%Y-%m') AS mes,
                SUM(donation_amount) AS total_donado
            FROM donations
            GROUP BY mes
            ORDER BY mes DESC;
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo donaciones por mes" });
    }
};
module.exports = {
    donationsGet,
    donationGetById,
    donationPost,
    donationPut,
    donationDelete,
    getDonationsByMonth
};
