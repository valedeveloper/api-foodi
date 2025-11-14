const { response } = require('express');
const { Categories } = require('../models/categories.model');

// Obtener todas las categorías
const categoriesGet = async (req, res = response) => {
    try {
        const data = await Categories.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener categorías', error });
    }
};

// Obtener una categoría por ID
const categoryGetById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const category = await Categories.findByPk(id);
        if (!category) return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
        res.json({ ok: true, data: category });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener categoría', error });
    }
};

// Crear una nueva categoría
const categoryPost = async (req, res = response) => {

    const { name, description } = req.body;
    try {
        const exists = await Categories.findOne({ where: { name } });
        if (exists) return res.status(400).json({ ok: false, msg: 'Ya existe una categoría con ese nombre' });

        const newCategory = await Categories.create({ name, description });
        res.json({ ok: true, msg: 'Categoría creada correctamente', data: newCategory });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al crear categoría', error });
    }
};

// Actualizar una categoría
const categoryPut = async (req, res = response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const category = await Categories.findByPk(id);
        if (!category) return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });

        await category.update({ name, description });
        res.json({ ok: true, msg: 'Categoría actualizada correctamente', data: category });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar categoría', error });
    }
};

// Eliminar una categoría
const categoryDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const category = await Categories.findByPk(id);
        if (!category) return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });

        await category.destroy();
        res.json({ ok: true, msg: 'Categoría eliminada correctamente', data: category });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar categoría', error });
    }
};

module.exports = {
    categoriesGet,
    categoryGetById,
    categoryPost,
    categoryPut,
    categoryDelete
};
