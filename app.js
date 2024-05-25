const express = require('express') //mengimpor framework express js di node js app
const cors = require('cors') //mengimpor cors untuk akses sumber daya dari domain lain 
const bodyParser = require('body-parser') //mengimport body parser untuk mengurai paket body yang dikirimkan dari request
const conn  = require('./src/Config/db') //mengimport koneksi database
const allRoute = require('./src/Routes'); //mengimport route keseluruhan
const testConnection = require('./src/Config/CheckConnection'); //mengimport fungsi yang dibuat untuk cek koneksi ke database
const multer = require('multer'); //mengimport multer untuk massalah upload file


//setting untuk upload file
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  })



const app = express(); //menggunakan framewokr express
app.use(cors()); //menggunakan cors
app.use(multerMid.single('file')) //menggunakan multer
app.use(bodyParser.json()) //menggunakan body parser
app.use(allRoute) //mengimplementasikan semua route

testConnection(conn) //test koneksi database

//cek dan sekaligus endpoint pembuka
app.get('/',(req,res)=>{
    res.json({
        "message" : "Selamat datang di API market store ! Lihat dokumentasi untuk informasi lebih lanjut"
    })
})

//menetapkan server HTTP untuk mendengarkan permintaan pada port 8080
app.listen(8080,()=>{
    console.log(`backend listening at http://localhost:8080`)
})