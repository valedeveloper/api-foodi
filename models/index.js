const { Categories } = require("./categories.model")
const { Products } = require("./products.model")
const { Stores } = require("./stores.model")
const { ProductBatch } = require("./productBatches.model")
const { Customers } = require("./customers.model")
const { Order } = require("./orders.model")

module.exports = {
    Categories,
    Stores,
    Products,
    ProductBatch,
    Customers,
    Order,
}