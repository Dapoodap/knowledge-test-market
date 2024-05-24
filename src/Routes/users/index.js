const express = require('express');
const {loginUser, registerUser, getAllUser, getUserById, updateDataUser, deleteUserById } = require('../../Controllers/users');
const { verifyToken } = require('../../Controllers/auth');
const router = express.Router();


/* verify token digunakan untuk otorisasi*/
router.get('/',verifyToken,getAllUser)
router.get('/:id',verifyToken,getUserById)
router.post('/register/',registerUser)
router.post('/login/',loginUser)
router.put('/:id',verifyToken,updateDataUser)
router.delete('/:id',verifyToken,deleteUserById)


module.exports = router