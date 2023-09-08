const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  // Obtenha o token JWT do cookie ou cabeçalho da solicitação
  const token = req.cookies.miToken || req.headers['x-auth-token'];

  // Verifique se o token existe
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  try {
    // Verifique e decodifique o token JWT usando sua chave secreta
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Adicione o objeto decodificado à solicitação como req.user
    req.user = decoded;

    // Continue para a próxima função de middleware ou rota
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = {validarJWT}
