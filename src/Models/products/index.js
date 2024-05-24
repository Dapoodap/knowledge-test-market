const { DataTypes } = require("sequelize");
const db = require("../../Config/db");

const Products = db.define(
  "Produk",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    gambarProduct: {
      type: DataTypes.JSON,
    },
    namaProduct: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    hargaProduct: {
      type: DataTypes.STRING,
    },
   
  },
  { tableName: "products" }
);

module.exports = Products;
