const User = require('C:/Users/Lenovo/Downloads/peminjaman barang/models/users.js'); // Pastikan path ini benar
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Membuat user baru (Register)
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'peminjam',
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (validPassword) {
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login berhasil', token: token, role: user.role });
    } else {
      res.status(400).json({ message: 'Password salah' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};

const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Create AdminUser

const createAdminUser = async (req, res) => {
  try {
    // Middleware otorisasi harus sudah memverifikasi bahwa req.user.role adalah 'admin'
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const adminUser = new User({
      email: req.body.email,
      password: hashedPassword,
      role: 'admin',
    });

    const newAdminUser = await adminUser.save();
    res.status(201).json(newAdminUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  createAdminUser,
};