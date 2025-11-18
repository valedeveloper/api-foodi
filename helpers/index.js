const { validarFK } = require("./fk-validator.js");
const {
    Categories,
    Stores,
    Products,
    ProductBatch,
    Customers,
    Order,
} = require("../models/index.js");

// CATEGORIES
const validarCategoriaExiste = async (category_id) =>
    await validarFK(Categories, category_id, "category_id");

// STORES
const validarStoreExiste = async (store_id) => {
    console.log("El store model:", Stores, store_id);
    return await validarFK(Stores, store_id, "store_id");
};

const validarProductoExiste = async (product_id) => {
    console.log(product_id);
    return await validarFK(Products, product_id, "ean_code");
};

// CUSTOMERS
const validarClienteExiste = async (customer_id) =>
    await validarFK(Customers, customer_id, "customer_id");

// ORDERS
const validarOrdenExiste = async (order_id) => {
    console.log(order_id);

    return await validarFK(Order, order_id, "order_id");

}
// BATCHES
const validarBatchExiste = async (batch_id) => {
    console.log(batch_id);

    return await validarFK(ProductBatch, batch_id, "batch_id");

}

// FOODBANK
// export const validarFoodbankExiste = async (foodbank_id) =>
//     validarFK(Foodbanks, foodbank_id, "foodbank_id");

module.exports = {
    validarCategoriaExiste, validarStoreExiste, validarProductoExiste, validarClienteExiste, validarOrdenExiste, validarBatchExiste
}