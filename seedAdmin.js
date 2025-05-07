const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/users.js'); // Pastikan path ini benar
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables (pastikan .env sudah diatur)

mongoose.connect(process.env.MONGODB_URI, { // Gunakan variabel env untuk koneksi
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Terhubung ke MongoDB untuk seeding'))
.catch(err => console.error('Gagal terhubung ke MongoDB untuk seeding', err));

async function createAdmin() {
  try {
    // Cari apakah sudah ada admin
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('Admin sudah ada di database. Tidak perlu membuat lagi.');
      mongoose.disconnect();
      return;
    }

    const adminEmail = 'yusep@example.com'; // Ganti dengan email admin yang Anda inginkan
    const adminPassword = 'admin123'; // Ganti dengan password yang kuat!

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = new User({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log(`Admin berhasil dibuat dengan email: ${adminEmail}`);
  } catch (error) {
    console.error('Gagal membuat admin', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();