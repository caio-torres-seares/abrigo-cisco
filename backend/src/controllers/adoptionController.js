const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const User = require('../models/User');
const ProfileAnalysis = require('../models/ProfileAnalysis');

// Listar todas as adoções
exports.listAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate('pet', 'name species breed age gender size photos status')
      .populate('user', 'name email phone');

    res.json(adoptions);
  } catch (error) {
    console.error('Erro ao listar adoções:', error);
    res.status(500).json({ message: 'Erro ao listar adoções', error: error.message });
  }
};

// Listar adoções do usuário atual
exports.listUserAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ user: req.user._id })
      .populate('pet', 'name species breed age gender size photos status')
      .populate('user', 'name email phone');

    res.json(adoptions);
  } catch (error) {
    console.error('Erro ao listar adoções do usuário:', error);
    res.status(500).json({ message: 'Erro ao listar adoções', error: error.message });
  }
};

// Solicitar adoção
exports.requestAdoption = async (req, res) => {
  try {
    const { pet, notes } = req.body;

    // Verifica se o pet existe
    const petExists = await Pet.findById(pet);
    if (!petExists) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    // Verifica se o pet está disponível
    if (petExists.status !== 'disponível') {
      return res.status(400).json({ message: 'Este pet não está disponível para adoção' });
    }

    // Verifica se o usuário tem um perfil completo
    const userProfile = await ProfileAnalysis.findOne({ userId: req.user._id });
    if (!userProfile || !userProfile.isComplete) {
      return res.status(400).json({ 
        message: 'Você precisa completar seu perfil antes de solicitar uma adoção',
        code: 'PROFILE_REQUIRED'
      });
    }

    // Verifica se já existe uma solicitação pendente para este pet
    const existingAdoption = await Adoption.findOne({
      pet,
      user: req.user._id,
      status: 'pendente'
    });

    if (existingAdoption) {
      return res.status(400).json({ message: 'Já existe uma solicitação pendente para este pet' });
    }

    // Cria a solicitação de adoção
    const adoption = new Adoption({
      pet,
      user: req.user._id,
      notes,
      status: 'pendente'
    });

    await adoption.save();

    // Atualiza o status do pet
    petExists.status = 'em processo de adoção';
    await petExists.save();

    res.status(201).json(adoption);
  } catch (error) {
    console.error('Erro ao solicitar adoção:', error);
    res.status(500).json({ message: 'Erro ao solicitar adoção', error: error.message });
  }
};

// Atualizar status da adoção (apenas funcionários)
exports.updateAdoptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verifica se a adoção existe
    const adoption = await Adoption.findById(id);
    if (!adoption) {
      return res.status(404).json({ message: 'Adoção não encontrada' });
    }

    // Verifica se o status é válido
    const validStatus = ['pendente', 'aprovada', 'rejeitada', 'cancelada'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    // Atualiza o status da adoção
    adoption.status = status;
    if (status === 'aprovada') {
      adoption.adoptionDate = new Date();
    }
    await adoption.save();

    // Atualiza o status do pet
    const pet = await Pet.findById(adoption.pet);
    if (pet) {
      if (status === 'aprovada') {
        pet.status = 'adotado';
      } else if (status === 'rejeitada' || status === 'cancelada') {
        pet.status = 'disponível';
      }
      await pet.save();
    }

    // Busca a adoção atualizada com o pet populado
    const updatedAdoption = await Adoption.findById(id)
      .populate('pet', 'name species breed age gender size photos status')
      .populate('user', 'name email phone');

    res.json(updatedAdoption);
  } catch (error) {
    console.error('Erro ao atualizar status da adoção:', error);
    res.status(500).json({ message: 'Erro ao atualizar status da adoção', error: error.message });
  }
};

// Cancelar adoção
exports.cancelAdoption = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se a adoção existe
    const adoption = await Adoption.findById(id);
    if (!adoption) {
      return res.status(404).json({ message: 'Adoção não encontrada' });
    }

    // Verifica se o usuário é o dono da solicitação ou um funcionário
    if (adoption.user.toString() !== req.user._id && !req.user.isEmployee) {
      return res.status(403).json({ message: 'Você não tem permissão para cancelar esta adoção' });
    }

    // Atualiza o status da adoção
    adoption.status = 'cancelada';
    await adoption.save();

    // Atualiza o status do pet
    const pet = await Pet.findById(adoption.pet);
    if (pet) {
      pet.status = 'disponível';
      await pet.save();
    }

    // Busca a adoção atualizada com o pet populado
    const updatedAdoption = await Adoption.findById(id)
      .populate('pet', 'name species breed age gender size photos status')
      .populate('user', 'name email phone');

    res.json(updatedAdoption);
  } catch (error) {
    console.error('Erro ao cancelar adoção:', error);
    res.status(500).json({ message: 'Erro ao cancelar adoção', error: error.message });
  }
}; 