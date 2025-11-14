const { response, request } = require('express');
const { Products } = require('../models/products.model');

// ✅ Obtener todos los productos
const productsGet = async (req, res = response) => {
    try {
        const products = await Products.findAll();
        res.json({ ok: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener productos', error });
    }
};

// ✅ Obtener producto por EAN
const productByIdGet = async (req, res = response) => {
    const { ean_code } = req.params;
    try {
        const product = await Products.findByPk(ean_code);
        if (!product) {
            return res.status(404).json({ ok: false, msg: `No existe producto con EAN ${ean_code}` });
        }
        res.json({ ok: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener producto', error });
    }
};

// ✅ Crear producto
const productPost = async (req = request, res = response) => {
    //Validar que exista categoria

    try {
        const product = await Products.create(req.body);
        res.json({ ok: true, msg: 'Producto creado exitosamente', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al crear producto', error });
    }
};

// ✅ Actualizar producto
const productPut = async (req = request, res = response) => {
    //Validar que exista categoria

    const { ean_code } = req.params;
    const { body } = req;
    try {
        const product = await Products.findByPk(ean_code);
        if (!product) {
            return res.status(404).json({ ok: false, msg: `No existe producto con EAN ${ean_code}` });
        }
        await product.update(body);
        res.json({ ok: true, msg: 'Producto actualizado correctamente', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar producto', error });
    }
};

// ✅ Eliminar producto
const productDelete = async (req = request, res = response) => {
    const { ean_code } = req.params;
    try {
        const product = await Products.findByPk(ean_code);
        if (!product) {
            return res.status(404).json({ ok: false, msg: `No existe producto con EAN ${ean_code}` });
        }
        await product.destroy();
        res.json({ ok: true, msg: 'Producto eliminado correctamente', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar producto', error });
    }
};

module.exports = {
    productsGet,
    productByIdGet,
    productPost,
    productPut,
    productDelete
};
