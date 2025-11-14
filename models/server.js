const express = require('express')
const cors = require('cors')

//const { bdmysql } = require('../database/MariaDbConnection');
const { bdmysql } = require('../database/mySqlConnection');


class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;


        this.pathsMySql = {
            // auth: '/api/auth',
            // prueba: '/api/prueba',

            //PATH heroes
            categories: '/api/categories',
            customers: '/api/customers',
            stores: '/api/stores',
            products: '/api/products',
            batches: '/api/batches',
            orders: '/api/orders',
            orderItem: '/api/orderItems',
            foodBank: '/api/foodBank',
            donations: '/api/donations',
            notifications: '/api/notifications',
            notificationsRecipients: '/api/notificationsRecipients'
            //PATH usuarios
            // usuarios: '/api/usuarios',

            // //Path Peliculas
            // peliculas: "/api/peliculas",

            // //Path protagonista
            // protagonistas: "/api/protagonistas"


        }


        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos desde la Clase...')
        })

        //Aqui me conecto a la BD
        this.dbConnection();


        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

    }



    async dbConnection() {
        try {
            await bdmysql.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }



    routes() {

        //this.app.use(this.pathsMySql.auth, require('../routes/MySqlAuth'));

        //Aqui activo la ruta de HEROES
        this.app.use(this.pathsMySql.categories, require('../routes/categories.routes'));
        this.app.use(this.pathsMySql.customers, require('../routes/customers.routes'));
        this.app.use(this.pathsMySql.stores, require('../routes/stores.routes'))
        this.app.use(this.pathsMySql.products, require('../routes/products.routes'))
        this.app.use(this.pathsMySql.batches, require('../routes/productBatches.routes'))
        this.app.use(this.pathsMySql.orders, require('../routes/orders.routes'))
        this.app.use(this.pathsMySql.orderItem, require('../routes/orderItems.routes'))
        this.app.use(this.pathsMySql.foodBank, require('../routes/foodBanks.routes'))
        this.app.use(this.pathsMySql.donations, require('../routes/donations.routes'))
        this.app.use(this.pathsMySql.notifications, require('../routes/notifications.routes'))
        this.app.use(this.pathsMySql.notificationsRecipients, require('../routes/notificationRecipients.routes'))
    }


    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON

        //JSON (JavaScript Object Notation)
        //es un formato ligero de intercambio de datos.
        //JSON es de fácil lectura y escritura para los usuarios.
        //JSON es fácil de analizar y generar por parte de las máquinas.
        //JSON se basa en un subconjunto del lenguaje de programación JavaScript,
        //Estándar ECMA-262 3a Edición - Diciembre de 1999.

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }



}

module.exports = Server;