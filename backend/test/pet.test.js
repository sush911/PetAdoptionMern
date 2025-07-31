// test/pet.test.js
const mongoose = require('mongoose');
const Pet = require('../models/Pet'); // Adjust path if needed

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/pet_adoption_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Pet model test', () => {
  it('should create & save a pet successfully', async () => {
    const validPet = new Pet({
      name: 'Buddy',
      type: 'dog',
      age: 3,
      image: 'buddy.jpg',
      description: 'A friendly dog',
    });

    const savedPet = await validPet.save();

    expect(savedPet._id).toBeDefined();
    expect(savedPet.name).toBe('Buddy');
    expect(savedPet.type).toBe('dog');
    expect(savedPet.age).toBe(3);
    expect(savedPet.image).toBe('buddy.jpg');
    expect(savedPet.description).toBe('A friendly dog');
    expect(savedPet.createdAt).toBeDefined();
    expect(savedPet.updatedAt).toBeDefined();
  });

  it('should fail if required fields are missing', async () => {
    const petWithoutRequiredFields = new Pet({ name: 'Kitty' });

    let err;
    try {
      await petWithoutRequiredFields.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.type).toBeDefined();
    expect(err.errors.age).toBeDefined();
    expect(err.errors.image).toBeDefined();
    expect(err.errors.description).toBeDefined();
  });

  it('should fail if type is not dog or cat', async () => {
    const invalidTypePet = new Pet({
      name: 'Whiskers',
      type: 'bird', // invalid type
      age: 2,
      image: 'whiskers.jpg',
      description: 'A cute bird',
    });

    let err;
    try {
      await invalidTypePet.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.type).toBeDefined();
  });

  it('should store type in lowercase and trimmed', async () => {
    const pet = new Pet({
      name: 'Luna',
      type: '  Cat  ',
      age: 1,
      image: 'luna.jpg',
      description: 'A playful kitten',
    });

    const savedPet = await pet.save();

    expect(savedPet.type).toBe('cat');
  });
});
