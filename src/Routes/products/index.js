const express = require('express');
const { getAllProducts, getProductById, postProudct, editDataProduct, deleteProductById } = require('../../Controllers/products');
const { verifyToken } = require('../../Controllers/auth');
const router = express.Router();

/* verify token digunakan untuk otorisasi alias haru udah punya akses sebagai yang udah login dulu*/
router.get('/',getAllProducts) //untuk get all produk
router.get('/:id',getProductById) //untuk get produk by id
router.post('/',verifyToken,postProudct) //untuk add produk baru
router.put('/:id',verifyToken,editDataProduct) //untuk update data produk
router.delete('/:id',verifyToken,deleteProductById) //untuk delete produk


module.exports = router