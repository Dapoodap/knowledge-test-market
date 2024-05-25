// Import modul util dari Node.js
const util = require('util');

// Import modul gc dari file './src/Config/storage'
const gc = require('./src/Config/storage');

// Mengambil referensi ke storage bucket "market-image-bucket" dari Google Cloud Storage (GCS)
const bucket = gc.bucket("market-image-bucket");

// Destrukturisasi fungsi 'format' dari modul util
const { format } = util;

/**
 * @param { File } object file object that will be uploaded
 * @description - This function uploads a file to the image bucket on Google Cloud.
 *                It accepts an object as an argument with the keys "originalname" and "buffer".
 */

const uploadImage = (file) => new Promise((resolve, reject) => {
  // Destrukturisasi 'originalname' dan 'buffer' dari objek 'file'
  const { originalname, buffer } = file;

  // Buat objek blob di dalam bucket dengan nama file yang diganti spasi menjadi '_' 
  const blob = bucket.file(originalname.replace(/ /g, "_"));
  
  // Buat writable stream untuk menulis buffer ke objek blob
  const blobStream = blob.createWriteStream({
    resumable: false
  });

  // Ketika penulisan selesai, dapatkan URL publik dan resolve promise
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    resolve(publicUrl);
  })

  // Tangani kesalahan jika ada saat mengunggah
  .on('error', (err) => {
    console.log(err);
    reject(`Unable to upload image, something went wrong`);
  })

  // Tulis buffer ke stream
  .end(buffer);
});

/**
 * @param {string} imageName - The name of the image file to be deleted
 * @description - This function deletes an image file from Google Cloud Storage
 */

const DeleteImage = (imageName) => {
  // Dapatkan referensi file di dalam bucket dengan nama yang diberikan
  const file = bucket.file(imageName);

  // Hapus file dari bucket
  return file
    .delete()
    .then(() => {
      console.log(`File ${imageName} deleted successfully`);
    })
    .catch((err) => {
      console.error(`Error deleting file ${imageName}: ${err}`);
      throw err;
    });
};
module.exports = {uploadImage,DeleteImage};
