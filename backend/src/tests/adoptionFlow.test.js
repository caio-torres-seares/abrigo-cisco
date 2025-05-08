const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config();

// Cria uma instância do Express para testes
const app = express();
app.use(cors());
app.use(express.json());

// Importa as rotas
const authRoutes = require('../routes/authRoutes');
const petRoutes = require('../routes/petRoutes');
const adoptionRoutes = require('../routes/adoptionRoutes');
const profileAnalysisRoutes = require('../routes/profileAnalysisRoutes');

// Usa as rotas
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/profile', profileAnalysisRoutes);

describe('Fluxo Completo de Adoção', () => {
  let token;
  let userId;
  let petId;

  // Conecta ao banco de testes
  beforeAll(async () => {
    try {
      const MONGODB_URI = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/adocao_pets_tests';
      console.log('Tentando conectar ao MongoDB:', MONGODB_URI);
      
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      
      console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
      throw error;
    }
  });

  // Limpa o banco antes de cada teste
  beforeEach(async () => {
    try {
      await mongoose.connection.dropDatabase();
      console.log('Banco de dados limpo com sucesso');
    } catch (error) {
      console.error('Erro ao limpar banco de dados:', error);
      throw error;
    }
  });

  // Desconecta do banco após todos os testes
  afterAll(async () => {
    try {
      await mongoose.connection.close();
      console.log('Conexão com MongoDB fechada com sucesso');
    } catch (error) {
      console.error('Erro ao fechar conexão com MongoDB:', error);
      throw error;
    }
  });

  it('deve executar o fluxo completo de adoção', async () => {
    // 1. Criar usuário
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Usuário Teste',
        email: 'teste@email.com',
        password: '123456',
        phone: '123456789',
        address: 'Rua Teste, 123'
      });

    expect(userResponse.status).toBe(201);
    userId = userResponse.body.user._id;
    token = userResponse.body.token;

    // 2. Criar perfil de análise
    const profileResponse = await request(app)
      .post('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        monthlyIncome: '3000',
        housingType: 'Casa',
        roomsCount: 3,
        hasPets: true,
        petsDescription: 'Já tive cachorros',
        hasChildren: false,
        childrenCount: 0,
        hoursAvailable: '4 horas'
      });

    expect(profileResponse.status).toBe(201);
    expect(profileResponse.body.isComplete).toBe(true);

    // 3. Criar pet (como funcionário)
    const petResponse = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        species: 'Cachorro',
        breed: 'Vira-lata',
        age: '2 anos',
        gender: 'Macho',
        size: 'Médio',
        status: 'disponível',
        photos: ['foto1.jpg']
      });

    expect(petResponse.status).toBe(201);
    petId = petResponse.body._id;

    // 4. Criar solicitação de adoção
    const adoptionResponse = await request(app)
      .post('/api/adoptions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pet: petId,
        notes: 'Gostaria de adotar este pet'
      });

    expect(adoptionResponse.status).toBe(201);
    expect(adoptionResponse.body.status).toBe('pendente');
    expect(adoptionResponse.body.pet._id.toString()).toBe(petId.toString());
    expect(adoptionResponse.body.user._id.toString()).toBe(userId.toString());
  });
}); 