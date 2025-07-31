// test/rescue.test.js
const mongoose = require('mongoose');
const Rescue = require('../models/Rescue'); // Adjust path if needed

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

describe('Rescue model test', () => {
  it('should create & save a rescue successfully', async () => {
    const validRescue = new Rescue({
      name: 'Happy Paws Rescue',
      phone: '123-456-7890',
      location: '123 Rescue St',
      animalType: 'dog',
      description: 'We rescue stray dogs',
    });

    const savedRescue = await validRescue.save();

    expect(savedRescue._id).toBeDefined();
    expect(savedRescue.name).toBe('Happy Paws Rescue');
    expect(savedRescue.phone).toBe('123-456-7890');
    expect(savedRescue.location).toBe('123 Rescue St');
    expect(savedRescue.animalType).toBe('dog');
    expect(savedRescue.description).toBe('We rescue stray dogs');
    expect(savedRescue.status).toBe('pending'); // default value
    expect(savedRescue.date).toBeDefined();
  });

  it('should fail when required fields are missing', async () => {
    const rescueMissingRequired = new Rescue({ name: 'No Phone Rescue' });

    let err;
    try {
      await rescueMissingRequired.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.phone).toBeDefined();
    expect(err.errors.location).toBeDefined();
    expect(err.errors.animalType).toBeDefined();
  });

  it('should allow saving without description', async () => {
    const rescueNoDescription = new Rescue({
      name: 'No Desc Rescue',
      phone: '987-654-3210',
      location: '456 Rescue Lane',
      animalType: 'cat',
    });

    const saved = await rescueNoDescription.save();
    expect(saved.description).toBeUndefined();
  });
});
