const Sequelize = require('sequelize');

//koneksi ke database
const conn = new Sequelize("market_db", "postgres", "dapos535", {
    host: "localhost", 
    port: 5432, // Port default PostgreSQL
    dialect: "postgres"
});


module.exports = conn;
