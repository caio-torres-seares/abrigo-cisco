// backend/src/tests/adoptionFlow.test.js
const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

jest.setTimeout(30000); // aumenta tempo máximo

// App mockado
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('../routes/authRoutes');
const petRoutes = require('../routes/petRoutes');
const adoptionRoutes = require('../routes/adoptionRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);

describe('Fluxo simples de cadastro e adoção', () => {
  let tokenUser;
  let tokenAdmin;
  let petId;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/abrigo-cisco-tests');
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
  });

  it('deve registrar um novo usuário', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Caio Teste',
      email: 'caio@email.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Exemplo, 123',
    });
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    userId = res.body.user._id;
  });

  it('deve autenticar o usuário e obter o token', async () => {
    // Registra antes de logar
    await request(app).post('/api/auth/register').send({
      name: 'Caio Teste',
      email: 'caio@email.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Exemplo, 123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'caio@email.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    tokenUser = res.body.token;
    userId = res.body.user._id;
  });

  it('deve tentar cadastrar um pet sem autorização e falhar', async () => {
    const res = await request(app)
      .post('/api/pets')
      .send({
        name: 'Nina',
        species: 'cachorro',
        breed: 'Pinscher',
        age: 2,
        gender: 'fêmea',
        size: 'pequeno',
        description: 'Cachorra muito dócil',
        photos: ['url_da_foto1', 'url_da_foto2'],
      });
  
    expect(res.status).toBe(401); // ou 403 dependendo da regra
    expect(res.body).toHaveProperty('message', 'Token não fornecido');
 // opcional, se retorna msg de erro
  });

  it('deve registrar um novo administrador', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Admin',
      email: 'admin@abrigocisco.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Exemplo, 123',
    });
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    userId = res.body.user._id;
  });

  it('deve autenticar o admin e obter o token', async () => {
    // Registra antes de logar
    await request(app).post('/api/auth/register').send({
      name: 'Admin',
      email: 'admin@abrigocisco.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Exemplo, 123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@abrigocisco.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    tokenAdmin = res.body.token;
    console.log("tokenAdmin: " + tokenAdmin);

    userId = res.body.user._id;
  });

  it('deve cadastrar um pet com autorização', async () => {
    // Registra e loga antes de criar pet
    await request(app).post('/api/auth/register').send({
      name: 'Admin',
      email: 'admin@abrigocisco.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Exemplo, 123',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'admin@abrigocisco.com',
      password: '123456',
    });
    tokenAdmin = login.body.token;
    console.log("tokenAdmin: " + tokenAdmin);


    const res = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        "name": "Nina",
        "species": "cachorro",
        "breed": "Pinscher",
        "age": 2,
        "gender": "fêmea",
        "size": "pequeno",
        "description": "Cachorra muito dócil",
        "photos": ["url_da_foto1", "url_da_foto2"]
      });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
    petId = res.body._id;
  });

  it('deve solicitar a adoção de um pet', async () => {
    // Registra, loga e cria pet antes de adotar
    await request(app).post('/api/auth/register').send({
      name: 'Caio Teste',
      email: 'caio@email.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Exemplo, 123',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'caio@email.com',
      password: '123456',
    });
    tokenUser = login.body.token;
    userId = login.body.user._id;

    const pet = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        name: 'Bolt',
        species: 'Cachorro',
        breed: 'Labrador',
        age: '3 anos',
        gender: 'Macho',
        size: 'Grande',
        status: 'disponível',
        photos: ['bolt.jpg'],
      });

    petId = pet.body._id;

    const res = await request(app)
      .post('/api/adoptions')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        pet: petId,
        notes: 'Quero muito adotar o Bolt!',
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('pendente');
    expect(res.body.user._id.toString()).toBe(userId.toString());
    expect(res.body.pet._id.toString()).toBe(petId.toString());
  });
});
