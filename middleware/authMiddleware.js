
// // Middleware para verificar a função do usuário
// const checkUserRole = (req, res, next) => {
//       // Verifica se o usuário possui a função necessária
//       //coger el token y usar el rol 
//       if (req.user && req.user.role === role) {

//         console.log('Usuário possui a função de', role);
//         next(); // Prossiga para o próximo middleware ou controle
//       } else {
      
//         return  res.status(403).json({
//           ok: false,
//           msg: 'Acesso não autorizado'
//         });
//       }
//     };
  
  
//   module.exports = { checkUserRole };
  