const express = require('express')
const router = express.Router();
const user = require('./users')
const products = require('./products')


router.use('/user',user)
router.use('/products',products)


module.exports = router