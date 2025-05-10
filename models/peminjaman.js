const mongoose = require('mongoose');

const PeminjamanSchema = new mongoose.Schema({
    namaLengkap: { type: String, required: true },
    nim: { type: String, required: true },
    namaBarang: { type: String, required: true },
    tanggalPinjam: { type: Date, required: true },
    tanggalKembali: { type: Date, required: true },
    keperluan: { type: String, required: true },
    status: { type: String, default: 'Diajukan' }
});

module.exports = mongoose.model('Peminjaman', PeminjamanSchema); // Nama model 'Peminjaman'