// Import modul '@google-cloud/storage' untuk berinteraksi dengan Google Cloud Storage (GCS)
const Cloud = require('@google-cloud/storage');

// Import modul 'path' dari Node.js untuk memanipulasi jalur file
const path = require('path');

// Menyusun jalur ke file kunci layanan JSON dari direktori saat ini ke level atas dan ke file 'key.json. Key json tidak akan terlihat karena harus di gitignore'
const serviceKey = path.join(__dirname, '../../key.json');

// Destrukturisasi kelas 'Storage' dari modul '@google-cloud/storage'
const { Storage } = Cloud;

// Membuat instansiasi objek 'Storage' dengan konfigurasi yang diberikan, termasuk kunci layanan dan ID proyek GCP
const storage = new Storage({
  keyFilename: serviceKey, // Menentukan jalur ke file kunci layanan untuk otentikasi
  projectId: 'core-incentive-424307-n2', // Menentukan ID proyek GCP bisa disimpan di env
});

// Mengekspor instansiasi objek 'Storage' agar dapat digunakan dari modul lain dalam aplikasi
module.exports = storage;
