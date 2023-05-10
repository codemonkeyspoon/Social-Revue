const { faker } = require('@faker-js/faker');
const { User } = require('../models');
const sequelize = require('../config/connection');

const seedUsers = async () => {
  // Generate an array of 10 user objects
  const userData = Array.from({ length: 100 }, (_, i) => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    up_score: faker.random.numeric(),
    down_score: faker.random.numeric(),
  }));

  // Create the users in the database
  await User.bulkCreate(userData);

  console.log('Users seeded successfully!');
};

module.exports = seedUsers;