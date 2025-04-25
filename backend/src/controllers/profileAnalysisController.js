const ProfileAnalysis = require('../models/ProfileAnalysis');
const User = require('../models/User');

// Criar uma nova análise de perfil
exports.createProfileAnalysis = async (req, res) => {
  try {
    const userId = req.user._id;
    const analysisData = req.body;

    // Verificar se já existe uma análise para este usuário
    const existingAnalysis = await ProfileAnalysis.findOne({ userId });
    if (existingAnalysis) {
      return res.status(400).json({ message: 'Já existe uma análise de perfil para este usuário' });
    }

    // Criar nova análise
    const profileAnalysis = new ProfileAnalysis({
      userId,
      ...analysisData,
      isComplete: true
    });

    await profileAnalysis.save();

    res.status(201).json({
      success: true,
      data: profileAnalysis
    });
  } catch (error) {
    console.error('Erro ao criar análise de perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar análise de perfil',
      error: error.message
    });
  }
};

// Obter análise de perfil por ID
exports.getProfileAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const profileAnalysis = await ProfileAnalysis.findById(id).populate('userId', 'name email');

    if (!profileAnalysis) {
      return res.status(404).json({ message: 'Análise de perfil não encontrada' });
    }

    res.status(200).json({
      success: true,
      data: profileAnalysis
    });
  } catch (error) {
    console.error('Erro ao buscar análise de perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar análise de perfil',
      error: error.message
    });
  }
};

// Obter análise de perfil por usuário
exports.getProfileAnalysisByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const profileAnalysis = await ProfileAnalysis.findOne({ userId }).populate('userId', 'name email');

    if (!profileAnalysis) {
      return res.status(404).json({ message: 'Análise de perfil não encontrada' });
    }

    res.status(200).json({
      success: true,
      data: profileAnalysis
    });
  } catch (error) {
    console.error('Erro ao buscar análise de perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar análise de perfil',
      error: error.message
    });
  }
};

// Atualizar análise de perfil
exports.updateProfileAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const profileAnalysis = await ProfileAnalysis.findByIdAndUpdate(
      id,
      { ...updateData, isComplete: true },
      { new: true, runValidators: true }
    );

    if (!profileAnalysis) {
      return res.status(404).json({ message: 'Análise de perfil não encontrada' });
    }

    res.status(200).json({
      success: true,
      data: profileAnalysis
    });
  } catch (error) {
    console.error('Erro ao atualizar análise de perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar análise de perfil',
      error: error.message
    });
  }
};

// Listar todas as análises de perfil
exports.getAllProfileAnalyses = async (req, res) => {
  try {
    const profileAnalyses = await ProfileAnalysis.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: profileAnalyses.length,
      data: profileAnalyses
    });
  } catch (error) {
    console.error('Erro ao listar análises de perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar análises de perfil',
      error: error.message
    });
  }
};

// Deletar análise de perfil
exports.deleteProfileAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const profileAnalysis = await ProfileAnalysis.findByIdAndDelete(id);

    if (!profileAnalysis) {
      return res.status(404).json({ message: 'Análise de perfil não encontrada' });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Erro ao deletar análise de perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar análise de perfil',
      error: error.message
    });
  }
}; 