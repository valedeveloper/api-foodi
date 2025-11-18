const { response } = require('express')
const { Customers } = require('../models/customers.model')
const bcrypt = require('bcryptjs')

const customerGet = async (req, res = response) => {
    try {
        const data = await Customers.findAll();
        res.json({
            ok: true,
            data
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener clientes', err
        })
    }
}


const customerGetById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const customer = await Customers.findByPk(id);
        if (!customer) return res.status(404).json({
            ok: false,
            msg: 'Cliente no encontrado'
        })
        res.json({
            ok: true,
            data: customer
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener cliente', error
        })

    }
}

const customerPost = async (req, res = response) => {
    const { name, cedula, email, password, phone, location_lat, location_lng } = req.body;

    try {
        const exists = await Customers.findOne({ where: { cedula } });
        if (exists) return res.status(400).json({ ok: false, msg: 'La cédula ya está registrado' });

        const salt = bcrypt.genSaltSync();
        const password_hash = bcrypt.hashSync(password, salt);

        const newCustomer = await Customers.create({
            name,
            cedula,
            email,
            password_hash,
            phone,
            location_lat,
            location_lng
        });

        res.json({ ok: true, msg: 'Cliente creado correctamente', data: newCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al crear cliente', error });
    }
};
const customerPut = async (req, res = response) => {
    const { id } = req.params
    const { name, cedula, email, password, phone, location_lat, location_lng } = req.body;

    try {
        const customer = await Customers.findByPk(id)
        if (!customer) return res.status(404).json({ ok: false, msg: 'Cliente no encontrado' })

        const exists = await Customers.findOne({ where: { cedula } });
        if (exists) return res.status(400).json({ ok: false, msg: 'La cédula ya está registrado' });

        await customer.update({ name, email, password, phone, location_lat, location_lng })
        res.json({
            ok: true,
            msg: 'Cliente actualizado',
            data: customer
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en actualizar el cliente', error
        })
    }
}

const customerDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const customer = await Customers.findByPk(id)
        if (!customer) return res.status(400).json({
            ok: false,
            msg: 'Cliente no encontrado'
        })

        await customer.destroy();
        res.json({
            ok: true,
            msg: 'Cliente eliminado éxitosamente'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al elimnar cliente', error
        })
    }
}

module.exports = {
    customerGet,
    customerGetById,
    customerPost,
    customerPut,
    customerDelete
}