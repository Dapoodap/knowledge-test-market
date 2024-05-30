// Mengimpor model users dan products dari direktori Models
const users = require("../Models/users");
const products = require("../Models/products");

// Fungsi async 'testConnection' untuk menguji koneksi ke database
async function testConnection(db) {
  try {
    // Mencoba untuk mengotentikasi koneksi ke database
    await db.authenticate();
    console.log("Connection to database has been established successfully.");

    // Jika koneksi berhasil, mencoba untuk melakukan sinkronisasi tabel
    try {
      await db.sync();
      console.log("All tables created successfully!");
    } catch (error) {
      // Tangani kesalahan jika tidak dapat membuat tabel
      console.error("Unable to create tables: ", error);
    }
  } catch (error) {
    // Tangani kesalahan jika tidak dapat terhubung ke database
    console.error("Unable to connect to the database: ", error);
  }
}

// Eksport fungsi 'testConnection' agar dapat digunakan di modul lain
module.exports = testConnection;
