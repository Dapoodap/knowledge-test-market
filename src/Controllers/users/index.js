const {nanoid} = require('nanoid');
const userModel = require("../../Models/users")
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    registerUser : async (req,res) =>{
        try {
            const {name,email,password,jenisKelamin} = req.body
            const id = nanoid(5)
            const hashPass = bycrpt.hashSync(password,10 /* bisa diganti dengan env.process.salt*/)
            const data = await userModel.create({
                id,name,email,password:hashPass, jenisKelamin
            })
            return res.status(201).json({
                message : "Register Success",
                data
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message : "gagal register",
                data : null
            })
        }
    },
    loginUser : async (req,res) =>{
       const {email,password} = req.body
       const theUser = await userModel.findOne({
        where:{
            email : email
        }
       });
       if (theUser == null) {
        return res.status(404).json({
            message : "can't find the user",
            data : null
        });
       }
       if (bycrpt.compareSync(password,theUser.password)) {
        const token = jwt.sign({theUser},"this is secret key" /* bisa diganti process.env.secretkey */,{expiresIn: '1h'})
        return res.status(200).json({
            message : "berhasil login",
            data : theUser,
            token
        })
       }else{
        return res.status(401).json({
            message : "email dan password tidak sesuai !",
            data : null,
            token : null
        })
       }
    },
    getAllUser : async (req,res)=>{
        try {
            const data = await userModel.findAll();
            return res.status(200).json({
                message : "sukses get all user",
                data
            })
        } catch (error) {
            return res.status(500).json({
                message : "internal server error",
                data : null
            })
        }
    },
    getUserById : async (req,res) =>{
        const {id} = req.params
        const theUser = await userModel.findOne({
            where:{
                id : id,
            }
        });
        if (theUser == null) {
            return res.status(404).json({
                message : "can't find the user",
                data : null
            })
        }
        return res.status(200).json({
            message : "user berhasil ditemukan",
            data : theUser
        })
    },
    updateDataUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.body;
    
        let updateData = {};
    
        // Pastikan hanya properti yang disertakan dalam body yang akan diubah
        if (name) {
            updateData.name = name;
        }
        if (email) {
            updateData.email = email;
        }
        if (password) {
            const hashPass = bycrpt.hashSync(password, 10 /* bisa diganti dengan env.process.salt*/);
            updateData.password = hashPass;
        }
    
        try {
            const editedUser = await userModel.update(updateData, { where: { id: id } });
    
            if (!editedUser[0]) {
                return res.status(500).json({
                    message: "Gagal mengupdate data pengguna",
                    data: null
                });
            } else {
                return res.status(200).json({
                    message: "Data pengguna berhasil diperbarui",
                    data: editedUser
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Terjadi kesalahan dalam mengupdate data pengguna",
                data: null
            });
        }
    },
    
    deleteUserById : async (req,res) =>{
        try {
            const {id} = req.params
            const deletedUser = await userModel.destroy({where:{
                id:id
            }});
            if (deletedUser == null) {
                return res.status(404).json({
                    message: "gagal untuk hapus data, tidak bisa menemukan id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    message: "sukses hapus data",
                    data: deletedUser
                  });
            }
        } catch (error) {
            return res.status(500).json({
                message: "internal server error",
                data: null
              });
        }
    }

}