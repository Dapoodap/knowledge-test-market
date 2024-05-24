const conn = require('../../Config/db')
const {DataTypes} = require('sequelize')

const users = conn.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jenisKelamin: {
        type: DataTypes.ENUM,
        values: ['laki-laki', 'perempuan'],
        allowNull: false
    },
});

module.exports = users;
