const Pet = require('../models/Pet');

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch pets' });
  }
};

// Create new pet
exports.createPet = async (req, res) => {
  try {
    let { name, type, age, description } = req.body;
    const image = req.file?.filename;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    type = type?.toLowerCase(); // normalize type

    const newPet = new Pet({ name, type, age, description, image });
    await newPet.save();

    res.status(201).json(newPet);
  } catch (err) {
    console.error('Create pet error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update pet
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    const { name, type, age, description } = req.body;

    pet.name = name || pet.name;
    pet.type = type ? type.toLowerCase() : pet.type; // normalize type
    pet.age = age || pet.age;
    pet.description = description || pet.description;
    pet.image = req.file ? req.file.filename : pet.image;

    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Error updating pet' });
  }
};

// Delete pet
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    res.status(200).json({ message: 'Pet deleted' });
  } catch (err) {
    console.error('Delete pet error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
