const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação dos campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Verifica se a senha do usuário existe
    if (!user.password) {
      console.error('Senha do usuário não encontrada:', user);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    // Log da senha armazenada no banco de dados
    console.log('Senha armazenada no banco de dados:', user.password);

    // Verifica a senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Verifica se o JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não está definido');
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        isEmployee: user.isEmployee 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove a senha do objeto de resposta
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

// Registro de usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validação dos campos obrigatórios
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    // Validação do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Verifica se o email já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Verifica se é um funcionário baseado no domínio do email
    const isEmployee = email.includes('@abrigocisco.com');

    // Cria o usuário com a senha em texto plano (será criptografada pelo middleware do modelo)
    const user = new User({
      name,
      email,
      password,
      phone,
      address,
      isEmployee
    });

    await user.save();

    // Verifica se o JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não está definido');
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        isEmployee: user.isEmployee 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove a senha do objeto de resposta
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
};

// Verificar token e retornar usuário atual
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
}; 