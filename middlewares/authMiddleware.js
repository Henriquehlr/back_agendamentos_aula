const jwt = require('jsonwebtoken');
const secret = 'seusegredojwtseguro'; // coloque no .env depois

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.userId = decoded.id;
    next();
  });
};
