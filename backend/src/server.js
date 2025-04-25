const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Importando os models
require('./models/User');
require('./models/Pet');
require('./models/Adoption');
require('./models/ProfileAnalysis');

// Importando as rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const profileAnalysisRoutes = require('./routes/profileAnalysisRoutes');

// Carregando variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servindo arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Conexão com o MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/abrigo-cisco';

console.log('Tentando conectar ao MongoDB...');
console.log('URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
  
  // Verifica se o banco de dados existe
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error('Erro ao listar coleções:', err);
      return;
    }
    console.log('Coleções disponíveis:', collections.map(c => c.name));
  });
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/profile-analysis', profileAnalysisRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Abrigo Cisco funcionando!' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 