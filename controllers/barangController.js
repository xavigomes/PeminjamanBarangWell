const Barang = require('C:/Users/Lenovo/Downloads/peminjaman barang/routes/barang.js');

// Mendapatkan semua barang
const getAllBarang = async (req, res) => {
  try {
    const barang = await Barang.find();
    res.json(barang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Membuat barang baru
const createBarang = async (req, res) => {
  const barang = new Barang({
    namaBarang: req.body.namaBarang,
    jumlah: req.body.jumlah,
    kondisi: req.body.kondisi,
  });

  try {
    const newBarang = await barang.save();
    res.status(201).json(newBarang);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mendapatkan barang berdasarkan ID
const getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }
    res.json(barang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate barang berdasarkan ID
const updateBarang = async (req, res) => {
  try {
    const barang = await Barang.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }
    res.json(barang);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menghapus barang berdasarkan ID
const deleteBarang = async (req, res) => {
  try {
    const barang = await Barang.findByIdAndDelete(req.params.id);
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }
    res.json({ message: 'Barang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBarang,
  createBarang,
  getBarangById,
  updateBarang,
  deleteBarang,
};