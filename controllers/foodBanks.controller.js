const { response } = require('express');
const { FoodBanks } = require('../models/foodBanks.model');

// Obtener todos los bancos de alimentos
const foodBanksGet = async (req, res = response) => {
    try {
        const data = await FoodBanks.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener los bancos de alimentos', error });
    }
};

// Obtener un banco de alimentos por ID
const foodBankGetById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const foodBank = await FoodBanks.findByPk(id);
        if (!foodBank) return res.status(404).json({ ok: false, msg: 'Banco de alimentos no encontrado' });
        res.json({ ok: true, data: foodBank });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener el banco de alimentos', error });
    }
};

// Crear un nuevo banco de alimentos
const foodBankPost = async (req, res = response) => {
    const { name, address, city, phone, email } = req.body;
    try {
        const exists = await FoodBanks.findOne({ where: { name } });
        if (exists) return res.status(400).json({ ok: false, msg: 'Ya existe un banco de alimentos con ese nombre' });

        const newFoodBank = await FoodBanks.create({ name, address, city, phone, email });
        res.json({ ok: true, msg: 'Banco de alimentos creado correctamente', data: newFoodBank });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al crear el banco de alimentos', error });
    }
};

// Actualizar un banco de alimentos
const foodBankPut = async (req, res = response) => {
    const { id } = req.params;
    const { name, address, city, phone, email } = req.body;
    try {
        const foodBank = await FoodBanks.findByPk(id);
        if (!foodBank) return res.status(404).json({ ok: false, msg: 'Banco de alimentos no encontrado' });

        await foodBank.update({ name, address, city, phone, email });
        res.json({ ok: true, msg: 'Banco de alimentos actualizado correctamente', data: foodBank });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar el banco de alimentos', error });
    }
};

// Eliminar un banco de alimentos
const foodBankDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const foodBank = await FoodBanks.findByPk(id);
        if (!foodBank) return res.status(404).json({ ok: false, msg: 'Banco de alimentos no encontrado' });

        await foodBank.destroy();
        res.json({ ok: true, msg: 'Banco de alimentos eliminado correctamente', data: foodBank });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar el banco de alimentos', error });
    }
};

module.exports = {
    foodBanksGet,
    foodBankGetById,
    foodBankPost,
    foodBankPut,
    foodBankDelete
};
