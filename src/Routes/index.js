const express = require('express')
const router = express.Router();
const user = require('./users')
const products = require('./products')

//akan ada 2 endpoint nantinya
    //untuk user (login,register) dan produk
router.use('/user',user)
router.use('/products',products)


module.exports = router