const mongoose = require('mongoose');

const BarangSchema = new mongoose.Schema({
  namaBarang: { type: String, required: true },
  jumlahTotal: { type: Number, required: true },
  jumlahTersedia: { type: Number, required: true },
  // Anda bisa menambahkan field lain seperti 'kondisi', 'deskripsi', dll.
});

module.exports = mongoose.model('Barang', BarangSchema);