const Pet = require('../models/pet');
const fs = require('fs');
const path = require('path');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get pets', error });
  }
};

exports.createPet = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.filename;

    const pet = new Pet(data);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create pet', error });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.filename;

    const pet = await Pet.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update pet', error });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    if (pet.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', pet.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Pet.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete pet', error });
  }
};
