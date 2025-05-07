const Peminjaman = require('C:/Users/Lenovo/Downloads/peminjaman barang/routes/peminjaman.js');

// Mendapatkan semua peminjaman
const getAllPeminjaman = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.find();
    res.json(peminjaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Membuat peminjaman baru
const createPeminjaman = async (req, res) => {
  const peminjaman = new Peminjaman({
    namaLengkap: req.body.namaLengkap,
    nim: req.body.nim,
    namaBarang: req.body.namaBarang,
    tanggalPinjam: req.body.tanggalPinjam,
    tanggalKembali: req.body.tanggalKembali,
    keperluan: req.body.keperluan,
  });

  try {
    const newPeminjaman = await peminjaman.save();
    res.status(201).json(newPeminjaman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mendapatkan peminjaman berdasarkan ID
const getPeminjamanById = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findById(req.params.id);
    if (!peminjaman) {
      return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    }
    res.json(peminjaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate status peminjaman
const updateStatusPeminjaman = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!peminjaman) {
      return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    }
    res.json(peminjaman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menghapus peminjaman berdasarkan ID
const deletePeminjaman = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findByIdAndDelete(req.params.id);
    if (!peminjaman) {
      return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    }
    res.json({ message: 'Peminjaman berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPeminjaman,
  createPeminjaman,
  getPeminjamanById,
  updateStatusPeminjaman,
  deletePeminjaman,
};