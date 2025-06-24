const jwt = require('jsonwebtoken'); // Importa a biblioteca para trabalhar com JSON Web Tokens (JWT)
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const secret = process.env.JWT_SECRET; // Obtém a chave secreta para validação do token a partir das variáveis de ambiente

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  // Pega o cabeçalho Authorization da requisição, que geralmente tem o formato "Bearer TOKEN"
  
  const token = authHeader && authHeader.split(' ')[1]; 
  // Se existir o cabeçalho, extrai o token, que é a segunda parte da string (depois do espaço)

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  // Se o token não estiver presente, responde com erro 401 (não autorizado)

  jwt.verify(token, secret, (err, decoded) => {
    // Verifica se o token é válido usando a chave secreta
    
    if (err) return res.status(403).json({ message: 'Token inválido' });
    // Se o token for inválido, responde com erro 403 (proibido)

    // Se o token for válido, salva no objeto `req.user` os dados decodificados (id e role do usuário)
    // para que possam ser usados nas próximas etapas da requisição
    req.user = { id: decoded.id, role: decoded.role };
    
    next(); // Chama o próximo middleware ou rota da cadeia
  });
};
