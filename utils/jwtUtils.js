const jwt = require('jsonwebtoken');

// Função para gerar um token JWT
const generarJWT = (uid, nombre, role) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, nombre, role };

    jwt.sign(
      payload,
      process.env.SECRET_KEY, // Sua chave secreta para assinar o token
      {
        expiresIn: '12h', // Tempo de expiração do token (por exemplo, 12 horas)
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
