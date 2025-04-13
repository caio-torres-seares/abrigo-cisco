const Pet = require('../models/Pet');
const fs = require('fs').promises;
const path = require('path');

// Criar um novo pet
exports.createPet = async (req, res) => {
  try {
    const petData = req.body;
    
    // Adiciona os caminhos das fotos ao petData
    if (req.files && req.files.length > 0) {
      petData.photos = req.files.map(file => `/uploads/${file.filename}`);
    }

    const pet = new Pet(petData);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    // Se houver erro, remove as imagens salvas
    if (req.files) {
      for (const file of req.files) {
        await fs.unlink(file.path).catch(console.error);
      }
    }
    res.status(500).json({ message: 'Erro ao criar pet', error: error.message });
  }
};

// Buscar todos os pets
exports.getPets = async (req, res) => {
  try {
    const { species, size, gender, status } = req.query;
    const filter = {};

    if (species) filter.species = species;
    if (size) filter.size = size;
    if (gender) filter.gender = gender;
    if (status) filter.status = status;

    const pets = await Pet.find(filter);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pets', error: error.message });
  }
};

// Buscar um pet por ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pet', error: error.message });
  }
};

// Atualizar um pet
exports.updatePet = async (req, res) => {
  try {
    const petData = req.body;
    
    // Adiciona os caminhos das novas fotos ao petData
    if (req.files && req.files.length > 0) {
      const oldPet = await Pet.findById(req.params.id);
      
      // Remove as fotos antigas
      if (oldPet && oldPet.photos) {
        for (const photo of oldPet.photos) {
          const filePath = path.join(__dirname, '../../', photo);
          await fs.unlink(filePath).catch(console.error);
        }
      }
      
      petData.photos = req.files.map(file => `/uploads/${file.filename}`);
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { ...petData, updatedAt: Date.now() },
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    res.json(pet);
  } catch (error) {
    // Se houver erro, remove as imagens novas
    if (req.files) {
      for (const file of req.files) {
        await fs.unlink(file.path).catch(console.error);
      }
    }
    res.status(500).json({ message: 'Erro ao atualizar pet', error: error.message });
  }
};

// Deletar um pet
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    // Remove as fotos do pet
    if (pet.photos) {
      for (const photo of pet.photos) {
        const filePath = path.join(__dirname, '../../', photo);
        await fs.unlink(filePath).catch(console.error);
      }
    }

    await pet.deleteOne();
    res.json({ message: 'Pet deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pet', error: error.message });
  }
}; 