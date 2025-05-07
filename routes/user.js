const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authorize = require('../middleware/authMiddleware');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Rute untuk membuat admin (hanya bisa diakses oleh admin)
router.post('/admin/users', authenticateToken, authorize(['admin']), userController.createAdminUser);

module.exports = router;