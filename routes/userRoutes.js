const express = require('express');
const router = express.Router();
const {createUser,getAllUsers,getUserById,updateUserById,deleteUserById,loginUser,renewToken} = require('../controllers/userControllers');
const {validarJWT} = require('../middleware/validatorJWT');


// Rota para fazer login
router.post('/login',loginUser);

// Rota para renovar o token
router.get('/renew', validarJWT, renewToken);


// Rota para criar um novo usuário
router.post('/', createUser);

// Rota para buscar todos os usuários
router.get('/', getAllUsers);

// Rota para buscar um usuário por ID
router.get('/:userId', getUserById);

// Rota para atualizar um usuário por ID
router.put('/:userId', updateUserById);

// Rota para excluir um usuário por ID
router.delete('/:userId', deleteUserById);


module.exports = router;
