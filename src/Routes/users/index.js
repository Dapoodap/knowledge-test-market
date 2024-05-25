const express = require('express');
const {loginUser, registerUser, getAllUser, getUserById, updateDataUser, deleteUserById } = require('../../Controllers/users');
const { verifyToken } = require('../../Controllers/auth');
const router = express.Router();


/* verify token digunakan untuk otorisasi alias haru udah punya akses sebagai yang udah login dulu*/
router.get('/',verifyToken,getAllUser) //untuk get all user
router.get('/:id',verifyToken,getUserById) //untuk get user by id
router.post('/register/',registerUser) //untuk register user baru
router.post('/login/',loginUser) //untuk login user
router.put('/:id',verifyToken,updateDataUser) //untuk edit user
router.delete('/:id',verifyToken,deleteUserById) //untuk delete user


module.exports = router