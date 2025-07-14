const Pet = require('../models/Pet');

// GET all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE pet with image upload
exports.createPet = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const { name, type, description } = req.body;

    const newPet = new Pet({
      name,
      type,
      description,
      image: req.file.filename,  // Save filename in DB
    });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    console.error('Create pet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE pet, optionally with new image
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    const { name, type, description } = req.body;

    pet.name = name || pet.name;
    pet.type = type || pet.type;
    pet.description = description || pet.description;

    if (req.file) {
      pet.image = req.file.filename;  // update image if new one uploaded
    }

    await pet.save();
    res.json(pet);
  } catch (error) {
    console.error('Update pet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE pet
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    await pet.remove();
    res.json({ message: 'Pet deleted' });
  } catch (error) {
    console.error('Delete pet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
