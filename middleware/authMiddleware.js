const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil token setelah "Bearer "

  if (token == null) {
    return res.status(401).json({ message: 'Token tidak ada' }); // 401: Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid' }); // 403: Forbidden
    }

    req.user = user; // Simpan data user di req.user untuk digunakan di rute selanjutnya
    next(); // Lanjutkan ke rute berikutnya
  });
};

module.exports = authenticateToken;

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      const userRole = req.user.role; // Diisi oleh middleware authenticateToken
  
      if (roles.length && !roles.includes(userRole)) {
        return res.status(403).json({ message: 'Tidak diizinkan' });
      }
  
      next();
    };
  };
  
  module.exports = authorize;