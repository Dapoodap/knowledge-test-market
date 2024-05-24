const users = require('../Models/users')
const products = require('../Models/products')
async function testConnection(db) {
    try {
        await db.authenticate();
        console.log('Connection to database has been established successfully.');
        try {
            await db.sync()
            console.log('all table created successfully!');
        } catch (error) {
            console.error('Unable to create table : ', error);

        }
    } catch (error) {
        console.error('Unable to connect to the database: ', error);

    }
}

module.exports = testConnection