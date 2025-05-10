const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const authenticateToken = require('../middleware/authMiddleware');
const authorize = require('../middleware/authMiddleware');

router.get('/', barangController.getAllBarang);
router.post('/', /*authenticateToken,*/ authorize(['admin']), barangController.createBarang);
router.get('/:id', barangController.getBarangById);
router.put('/:id', /*authenticateToken,*/ authorize(['admin']), barangController.updateBarang);
router.delete('/:id', /*authenticateToken,*/ authorize(['admin']), barangController.deleteBarang);

module.exports = router;