const { Schema, model } = require("mongoose");

// Defina o esquema do modelo de usuário
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor'], // Defina os papéis permitidos para os usuários
    default: 'editor', // Defina o papel padrão
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Crie e exporte o modelo de usuário
module.exports = model("User",userSchema)
