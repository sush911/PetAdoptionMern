// petController.js
const Pet = require('../models/pet');

exports.getAllPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

exports.createPet = async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.status(201).json(pet);
};

exports.updatePet = async (req, res) => {
  const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deletePet = async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
