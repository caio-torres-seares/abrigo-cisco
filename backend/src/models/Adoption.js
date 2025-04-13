const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: [true, 'Pet é obrigatório']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório']
  },
  status: {
    type: String,
    required: [true, 'Status é obrigatório'],
    enum: ['pendente', 'aprovada', 'rejeitada', 'cancelada'],
    default: 'pendente',
    trim: true
  },
  adoptionDate: {
    type: Date
  },
  notes: {
    type: String,
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
adoptionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware para atualizar o campo updatedAt antes de atualizar
adoptionSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Adoption = mongoose.model('Adoption', adoptionSchema);

module.exports = Adoption; 