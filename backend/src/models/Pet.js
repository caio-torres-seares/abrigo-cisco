const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  species: {
    type: String,
    required: [true, 'Espécie é obrigatória'],
    enum: ['cachorro', 'gato', 'outro'],
    trim: true
  },
  breed: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    min: [0, 'A idade não pode ser negativa']
  },
  gender: {
    type: String,
    required: [true, 'Gênero é obrigatório'],
    enum: ['macho', 'fêmea'],
    trim: true
  },
  size: {
    type: String,
    enum: ['pequeno', 'médio', 'grande'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  photos: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    required: [true, 'Status é obrigatório'],
    enum: ['disponível', 'em processo de adoção', 'adotado'],
    default: 'disponível',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar o campo updatedAt antes de salvar
petSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware para atualizar o campo updatedAt antes de atualizar
petSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet; 