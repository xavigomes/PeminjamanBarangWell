const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongoose connection state:', mongoose.connection.readyState); // <-- Di sini
    console.log('Terhubung ke MongoDB');
  } catch (error) {
    console.error('Gagal terhubung ke MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;