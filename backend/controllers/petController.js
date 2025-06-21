const Pet = require('../models/Pet');

exports.getAllPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

exports.getPetById = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).json({ message: 'Pet not found' });
  res.json(pet);
};

exports.createPet = async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.status(201).json(pet);
};

exports.updatePet = async (req, res) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(pet);
};

exports.deletePet = async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
