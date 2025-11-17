const { validarFK } = require("./fk-validator.js");
const {
    Categories,
    Stores,
    Products,
    ProductBatches,
    Customers,
    Orders,
} = require("../models/index.js");

// CATEGORIES
const validarCategoriaExiste = async (category_id) =>
    validarFK(Categories, category_id, "category_id");

// STORES
const validarStoreExiste = async (store_id) =>
    validarFK(Stores, store_id, "store_id");

// PRODUCTS
const validarProductoExiste = async (product_id) =>
    validarFK(Products, product_id, "ean_code");

// CUSTOMERS
const validarClienteExiste = async (customer_id) =>
    validarFK(Customers, customer_id, "customer_id");

// ORDERS
const validarOrdenExiste = async (order_id) =>
    validarFK(Orders, order_id, "order_id");

// BATCHES
const validarBatchExiste = async (batch_id) =>
    validarFK(ProductBatches, batch_id, "batch_id");

// FOODBANK
// export const validarFoodbankExiste = async (foodbank_id) =>
//     validarFK(Foodbanks, foodbank_id, "foodbank_id");

module.exports = {
    validarCategoriaExiste, validarStoreExiste, validarProductoExiste, validarClienteExiste, validarOrdenExiste, validarBatchExiste
}