const Adoption = require('../models/Adoption'); // your Mongoose model
const { connect, closeDatabase, clearDatabase } = require('./db-handler');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Adoption Model Test', () => {
  it('should create and save an adoption successfully', async () => {
    const validAdoption = new Adoption({
      userId: '1234567890abcdef',
      petId: 'abcdef1234567890',
      status: 'pending',
    });
    const savedAdoption = await validAdoption.save();

    expect(savedAdoption._id).toBeDefined();
    expect(savedAdoption.status).toBe('pending');
  });

  it('should update the status of adoption', async () => {
    const adoption = new Adoption({
      userId: '1234567890abcdef',
      petId: 'abcdef1234567890',
      status: 'pending',
    });
    const saved = await adoption.save();

    saved.status = 'approved';
    const updated = await saved.save();

    expect(updated.status).toBe('approved');
  });
});
