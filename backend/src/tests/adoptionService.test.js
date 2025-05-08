// backend/src/tests/adoptionIntegration.test.js
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

describe('Testes de Integração - Fluxo Completo', () => {
  let token;
  let userId;
  let petId;

  // Conecta ao banco de testes
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/abrigo-cisco-tests');
  });

  // Limpa o banco antes de cada teste
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  // Desconecta do banco após todos os testes
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
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

    // 2. Login para obter o token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@email.com',
        password: '123456'
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
    token = loginResponse.body.token;

    // 3. Criar perfil de análise
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

    // 4. Criar pet (como funcionário)
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

    // 5. Criar solicitação de adoção
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