const Sequelize = require('sequelize');

const conn = new Sequelize("market_db", "postgres", "dapos535", {
    host: "localhost", // Perhatikan penulisan "localhost" dengan benar
    port: 5432, // Port default PostgreSQL
    dialect: "postgres"
});


module.exports = conn;
