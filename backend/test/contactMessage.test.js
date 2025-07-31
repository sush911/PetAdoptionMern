// test/contactMessage.test.js
const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage'); // Adjust path if needed

beforeAll(async () => {
  // Connect to your local MongoDB test database
  await mongoose.connect('mongodb://localhost:27017/pet_adoption_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up the database and close the connection after tests
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('ContactMessage model test', () => {
  it('should create & save a contact message successfully', async () => {
    const validContact = new ContactMessage({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.',
    });

    const savedContact = await validContact.save();

    // Assertions
    expect(savedContact._id).toBeDefined();
    expect(savedContact.name).toBe('John Doe');
    expect(savedContact.email).toBe('john@example.com');
    expect(savedContact.message).toBe('Hello, this is a test message.');
    expect(savedContact.createdAt).toBeDefined();
  });

  it('should fail to create a contact message without required fields', async () => {
    const contactWithoutRequiredField = new ContactMessage({ name: 'Jane' });

    let err;
    try {
      await contactWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
    expect(err.errors.message).toBeDefined();
  });
});
