const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken: Mulai');

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil token setelah "Bearer "

    console.log('authHeader:', authHeader);
    console.log('token:', token);

  if (token == null) {
    console.log('authenticateToken: Token null, kirim 401');
    return res.status(401).json({ message: 'Token tidak ada' }); // 401: Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { 
    console.log('authenticateToken: jwt.verify callback');
    console.log('authenticateToken: jwt.verify err:', err);
    console.log('authenticateToken: jwt.verify decoded:', decoded);
    console.log('jwt.verify error:', err);
    if (err) {
      console.log('authenticateToken: Token tidak valid, kirim 403');
      return res.status(403).json({ message: 'Token tidak valid' }); // 403: Forbidden
    }

    req.user = user; // Simpan data user di req.user untuk digunakan di rute selanjutnya
    console.log('authenticateToken: Token valid, next()');
    next(); // Lanjutkan ke rute berikutnya
  });
   console.log('authenticateToken: Selesai (mungkin tidak dicetak)');
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