const mongoose = require('mongoose');

const profileAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  monthlyIncome: {
    type: String,
    required: [true, 'Renda mensal é obrigatória']
  },
  housingType: {
    type: String,
    required: [true, 'Tipo de moradia é obrigatório']
  },
  roomsCount: {
    type: Number,
    required: [true, 'Número de cômodos é obrigatório'],
    min: [1, 'Número de cômodos deve ser maior que 0']
  },
  hasPets: {
    type: Boolean,
    required: [true, 'Informação sobre experiência com pets é obrigatória']
  },
  petsDescription: {
    type: String
  },
  hasChildren: {
    type: Boolean,
    required: [true, 'Informação sobre crianças é obrigatória']
  },
  childrenCount: {
    type: Number,
    min: [0, 'Número de crianças não pode ser negativo']
  },
  hoursAvailable: {
    type: String,
    required: [true, 'Horas disponíveis é obrigatório']
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pendente', 'aprovado', 'reprovado'],
    default: 'pendente'
  },
  analysisNotes: {
    type: String
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

// Middleware para atualizar o campo updatedAt
profileAnalysisSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

profileAnalysisSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const ProfileAnalysis = mongoose.model('ProfileAnalysis', profileAnalysisSchema);

module.exports = ProfileAnalysis; 