const { nanoid } = require("nanoid");
const productModel = require("../../Models/products");
const { uploadImage,DeleteImage } = require("../../../helper");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      //mengambil semua data produk
      const data = await productModel.findAll();
      return res.status(200).json({
        message: "Sukses ambil data semua produk",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Gagal ambil data semua produk",
        data: null,
      });
    }
  },
  getProductById: async (req, res) => {
    //mengambil id dari param
    const { id } = req.params;

    //mengambil data produk yang id nya sama dengan param
    const theProduct = await productModel.findOne({
      where: {
        id: id,
      },
    });

    //kalo gak ketemu di handle dibawah
    if (theProduct == null) {
      return res.status(404).json({
        message: "tidak dapat menemukan product id",
        data: null,
      });
    }
    return res.status(200).json({
      message: "product berhasil ditemukan",
      data: theProduct,
    });
  },
  postProudct: async (req, res) => {
    try {
      //mengambil inputan dari request body
      const { name, deskripsi, harga } = req.body;
      //menerima inputan file
      const myFile = req.file
      //mengupload data ke storage dan mengambalikan dalam bentuk link nanti
      const imageUrl = await uploadImage(myFile)
      //generate id
      const id = nanoid(5);
      //membuat data produk ke database
      const data = await productModel.create({
        id,
        gambarProduct: imageUrl,
        namaProduct: name,
        deskripsiProduct: deskripsi,
        hargaProduct: harga,
      });
      return res.status(201).json({
        message: "Sukses create data product",
        data,
      });
    } catch (error) {
      console.log(error)
      console.log(error)
      return res.status(500).json({
        message: "Gagal create data product",
        data : null,
      });
    }
  },
  editDataProduct: async (req, res) => {
    //mengambil data id dari param
    const { id } = req.params;
    //menerima inputan dari body
    const { name, deskripsi, harga } = req.body;

    //inisiasi update data
    let updateData = {};

    // Pastikan hanya properti yang disertakan dalam body yang akan diubah
    if (name) {
      updateData.namaProduct = name;
    }
    if (deskripsi) {
      updateData.deskripsiProduct = deskripsi;
    }
    if (harga) {
        updateData.hargaProduct = harga;
    }

    try {
      const editedProduct = await productModel.update(updateData, {
        where: { id: id },
      });

      if (!editedProduct[0]) {
        return res.status(404).json({
          message: "Gagal mengupdate data produk, id tidak ditemukan",
          data: null,
        });
      } else {
        return res.status(200).json({
          message: "Data produk berhasil diperbarui",
          data: updateData,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan dalam mengupdate data product",
        data: null,
      });
    }
  },
  deleteProductById : async (req,res) =>{
    try {
      const { id } = req.params;
  
      // Cari produk yang akan dihapus
      const product = await productModel.findOne({ where: { id: id } });
      if (!product) {
        return res.status(404).json({
          message: "Gagal untuk hapus data, tidak bisa menemukan id",
          data: null,
        });
      }
  
      // Hapus produk dari database
      const deletedProduct = await productModel.destroy({ where: { id: id } });
  
      // Hapus gambar produk dari Google Cloud Storage
      const imageUrl = product.gambarProduct;
      const imageName = imageUrl.split('/').pop(); // Mendapatkan nama file dari URL
      await DeleteImage(imageName);
  
      return res.status(200).json({
        message: "Sukses hapus data",
        data: deletedProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
        data: null,
      });
    }
  }
};
