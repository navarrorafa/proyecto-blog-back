const User = require('../models/userModels'); // Importe o modelo de usuário
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../utils/jwtUtils');


// Função para criar um novo usuário
const createUser = async (req, res) => {
    try {
      // Obtenha os dados do usuário do corpo da solicitação
      const { email, password, passConfirm, name, role, date } = req.body;
  
      // Verifique se o usuário já existe
      let user = await User.findOne({ email: email });
  
      if (user) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe usuario'
        });
      }
  
      // Verifique se a senha coincide com a confirmação de senha
      if (password !== passConfirm) {
        return res.status(400).json({
          ok: false,
          msg: 'La contraseña no coincide'
        })
      }
  
      // Crie um novo usuário e criptografe a senha
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({ email, name, password: hashedPassword, role, date });
  
      // Salve o novo usuário no banco de dados
      await newUser.save();
  
      // Envie uma resposta de sucesso
      res.status(201).json({
        ok: true,
        data: newUser,
        msg: "Editor guardado"
      });
    } catch (error) {
      // Em caso de erro, envie uma resposta de erro
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  };
  
// Função para buscar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    // Consulte o banco de dados para obter todos os usuários
    const users = await User.find();

    // Envie os usuários como resposta
    res.status(200).json(users);
  } catch (error) {
    // Em caso de erro, envie uma resposta de erro
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// Função para buscar um usuário por ID
const getUserById = async (req, res) => {
  try {
    // Obtenha o ID do usuário a partir dos parâmetros da solicitação
    const { userId } = req.params;

    // Consulte o banco de dados para obter o usuário pelo ID
    const user = await User.findById(userId);

    if (!user) {
      // Se o usuário não for encontrado, envie uma resposta 404 (não encontrado)
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Envie o usuário como resposta
    res.status(200).json(user);
  } catch (error) {
    // Em caso de erro, envie uma resposta de erro
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
  }
};

// Função para atualizar um usuário por ID
const updateUserById = async (req, res) => {
  try {
    // Obtenha o ID do usuário a partir dos parâmetros da solicitação
    const { userId } = req.params;
    // Obtenha os dados atualizados do usuário do corpo da solicitação
    const updatedUserData = req.body;

    // Consulte o banco de dados e atualize o usuário pelo ID
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true, // Retorna o usuário atualizado em vez do original
    });

    if (!updatedUser) {
      // Se o usuário não for encontrado, envie uma resposta 404 (não encontrado)
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Envie o usuário atualizado como resposta
    res.status(200).json(updatedUser);
  } catch (error) {
    // Em caso de erro, envie uma resposta de erro
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário por ID' });
  }
};

// Função para excluir um usuário por ID
const deleteUserById = async (req, res) => {
  try {
    // Obtenha o ID do usuário a partir dos parâmetros da solicitação
    const { userId } = req.params;

    // Consulte o banco de dados e exclua o usuário pelo ID
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      // Se o usuário não for encontrado, envie uma resposta 404 (não encontrado)
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Envie uma resposta de sucesso
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    // Em caso de erro, envie uma resposta de erro
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir usuário por ID' });
  }
};

//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // console.log('Recebida uma solicitação de login')
      let user = await User.findOne({ email: email });
       console.log(user)
      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: 'Ese usuario no existe'
        });
      }
  
      let passOk = await bcrypt.compareSync(password, user.password);
     
  
      if (!passOk) {
        return res.status(400).json({
          ok: false,
          msg: 'La contraseña no coincide'
        });
      }
  
      const token = await generarJWT(user.id, user.name, user.role);

     
  
    //   Configurar o token em um cookie usando o cookie-parser
    res.cookie('miToken', token, {
        httpOnly: true,
        //secure: true, // Somente se o frontend estiver sendo servido por HTTPS
        sameSite: 'none', // Envia cookei a servidores distintos
        maxAge: 12 * 60 * 60 * 1000, //12h
      });
      console.log('Cookie de autenticação definido com sucesso:', token);
  
      res.status(200).json({
        ok: true,
        uid: user.id,
        nombre: user.name,
        email: user.email,
        role: user.role,
        token
      });
  
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Contacte el admin'
      });
    }
  };

// RENOVAR TOKEN
const renewToken = async (req, res) => {
    try {
      // Obtenha o ID de usuário, nome e papel da solicitação (já que você pode querer incluí-los no novo token)
      const { uid, nombre, role } = req.user;
  
      

      // Gere um novo token JWT com o tempo de expiração personalizado
      const token = await generarJWT(uid, nombre, role);
  
      // Defina o novo token na cookie (substituindo o token anterior)
      res.cookie('miToken', token, {
        httpOnly: true, // A cookie só pode ser acessada por meio de solicitações HTTP
        maxAge: 12 * 60 * 60 * 1000, // Tempo de vida do cookie em milissegundos (por exemplo, 12 horas)
      });
  
      // Envie o novo token como resposta
      res.status(200).json({
        ok: true,
        msg: "Token renovado",
        user: {
          uid,
          nombre,
          role,
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Erro ao renovar token'
      });
    }
  };
  
  

module.exports = {createUser,deleteUserById,getAllUsers,getUserById,updateUserById,loginUser,renewToken}
