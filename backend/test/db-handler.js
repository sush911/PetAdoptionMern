const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/petadoption_test'; // use a dedicated test DB

module.exports.connect = async () => {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports.closeDatabase = async () => {
  // Drop the database and close connection after all tests
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

module.exports.clearDatabase = async () => {
  // Delete all data from all collections between tests
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
