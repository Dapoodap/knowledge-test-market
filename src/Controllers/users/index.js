const {nanoid} = require('nanoid');
const userModel = require("../../Models/users")
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    //fungsi untuk register user baru
    registerUser : async (req,res) =>{
        try {
            //menerima inputan dari user
            const {name,email,password,jenisKelamin} = req.body
            //membuat generate id
            const id = nanoid(5)
            //hashing password
            const hashPass = bycrpt.hashSync(password,10 /* bisa diganti dengan env.process.salt*/)
            //membuat data di database
            const data = await userModel.create({
                id,name,email,password:hashPass, jenisKelamin
            })
            return res.status(201).json({
                message : "Register Success",
                data
            })
        } catch (error) {
            //handle error
            console.log(error)
            return res.status(500).json({
                message : "gagal register",
                data : null
            })
        }
    },
    loginUser : async (req,res) =>{
        //inputan login berupa email dan password
       const {email,password} = req.body
       //cari di database apakah ada user yang emailnya seperti di inputan
       const theUser = await userModel.findOne({
        where:{
            email : email
        }
       });
       //jika tidak ada alias null, maka tidak akan ketemu
       if (theUser == null) {
        return res.status(404).json({
            message : "Data tidak ditemukan",
            data : null
        });
       }
       //kalo ada maka dia akan mengecek kesamaan password di database dengan yang diinputkan
       if (bycrpt.compareSync(password,theUser.password)) {
        const token = jwt.sign({theUser},"this is secret key" /* bisa diganti process.env.secretkey */,{expiresIn: '1h'})
        return res.status(200).json({
            message : "berhasil login",
            data : theUser,
            token : `Bearer ${token}`
        })
       }else{
        //kalo gak sesuai 401 unauthorized
        return res.status(401).json({
            message : "email dan password tidak sesuai !",
            data : null,
            token : null
        })
       }
    },
    getAllUser : async (req,res)=>{
        try {
            //mengambil semua data user
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
        //mencari user yang id nya seperti di parameter
        const theUser = await userModel.findOne({
            where:{
                id : id,
            }
        });
        //kalo null atau gaada maka tidak ditemukan 404
        if (theUser == null) {
            return res.status(404).json({
                message : "tidak dapat menemukan user",
                data : null
            })
        }
        return res.status(200).json({
            message : "user berhasil ditemukan",
            data : theUser
        })
    },
    updateDataUser: async (req, res) => {
        //menerima params id untuk spesifik data user
        const { id } = req.params;
        //menerima inputan jika ada data name, email, password (jika ada salah satunya)
        const { name, email, password } = req.body;
    
        //inisiasi data yang akan diganti
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
            //update data yang mana id nya seperti yang di params
            const editedUser = await userModel.update(updateData, { where: { id: id } });
    
            //handle kalo tidak ada id nnya 
            if (!editedUser[0]) {
                return res.status(404).json({
                    message: "Gagal mengupdate data pengguna tidak ditemukan",
                    data: null
                });
            } else {
                 //handle kalo ada id nnya 
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
            //mengambil id di parameter
            const {id} = req.params

            //delete user dari database yang id nya sama dengan id di params
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