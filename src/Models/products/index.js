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
    },
    deskripsiProduct: {
      type: DataTypes.TEXT,
    },
    hargaProduct: {
      type: DataTypes.DECIMAL,
    },
   
  },
  { tableName: "products" }
);

module.exports = Products;
