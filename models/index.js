const { Categories } = require("./categories.model")
const { Products } = require("./products.model")
const { Stores } = require("./stores.model")
const { ProductBatches } = require("./productBatches.model")
const { Customers } = require("./customers.model")
const { Orders } = require("./orders.model")

module.exports = {
    Categories,
    Stores,
    Products,
    ProductBatches,
    Customers,
    Orders,
}