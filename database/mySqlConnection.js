const { Sequelize } = require('sequelize');

const bdmysql = new Sequelize(
    'foodi_app',
    'root',
    '',
    {
        host: 'localhost',
        port: '3307',
        dialect: 'mysql'
    }
);

const bdmysqlNube = new Sequelize(
    'myDb',
    'mydb',
    'mariadb',
    {
        host: 'monorail.proxy.rlwy.net',
        port: '23251',
        dialect: 'mysql'
    }
);

module.exports = {
    bdmysql, bdmysqlNube
}
