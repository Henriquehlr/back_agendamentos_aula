const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

const secret = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, secret, (err, decoded) => {
    
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = { id: decoded.id, role: decoded.role };
    
    next(); 
  });
};
