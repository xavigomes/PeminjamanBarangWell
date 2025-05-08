const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('C:/Users/Lenovo/Downloads/peminjaman barang/config/database.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());``
app.use(express.json());

// Connect to Database
connectDB();

// Middleware CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use('/barang', require('C:/Users/Lenovo/Downloads/peminjaman barang/routes/barang.js'));
app.use('/peminjaman', require('C:/Users/Lenovo/Downloads/peminjaman barang/routes/peminjaman.js'));
app.use('/user', require('C:/Users/Lenovo/Downloads/peminjaman barang/routes/user.js'));

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});