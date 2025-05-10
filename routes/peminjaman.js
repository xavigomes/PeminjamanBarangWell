const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const authenticateToken = require('../middleware/authMiddleware');
const authorize = require('../middleware/authMiddleware');

router.get('/', /*authenticateToken,*/ authorize(['admin']), peminjamanController.getAllPeminjaman); // Hanya admin yang bisa melihat semua
router.post('/', /*authenticateToken,*/ peminjamanController.createPeminjaman); // Semua yang login bisa membuat peminjaman
router.get('/:id', /*authenticateToken,*/ peminjamanController.getPeminjamanById); // Semua yang login bisa lihat detail peminjaman sendiri
router.patch('/:id', /*authenticateToken,*/ authorize(['admin']), peminjamanController.updateStatusPeminjaman); // Hanya admin yang bisa update status
router.delete('/:id', /*authenticateToken,*/ authorize(['admin']), peminjamanController.deletePeminjaman); // Hanya admin yang bisa hapus peminjaman

module.exports = router;

// routes/peminjaman.js
// router.post('/', async (req, res) => {
//     const peminjaman = new Peminjaman(req.body);
//     try {
//       const newPeminjaman = await peminjaman.save();
//       res.status(201).json(newPeminjaman);
//     } catch (err) {
//       let errorMessage = 'Terjadi kesalahan saat menyimpan peminjaman.';
//       if (err.errors) {
//         errorMessage = Object.values(err.errors).map(el => el.message).join(', ');
//       }
//       res.status(400).json({ message: errorMessage });
//     }
//   });

