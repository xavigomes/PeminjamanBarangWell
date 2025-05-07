const mongoose = require('mongoose');

const BarangSchema = new mongoose.Schema({
  namaBarang: { type: String, required: true },
  jumlah: { type: Number, required: true },
  kondisi: { type: String, required: true },
});

module.exports = mongoose.model('Barang', BarangSchema);