const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/connection');
const Topic = require('../models/Topic');




const topicData = [
  {
    
    name: "Games",
    
  },
  {
    
    name: "Movies",
    
  },
  {
    
    name: "Music",
    
  },
  {
    
    name: 'News',
    
  },
  {
    
    name: 'Food',
    
  },
  {
    
    name: 'Lifestyle',
    
  },
];


const seedTopics = async () => {
    try {
      await sequelize.sync({ force: true }); // Sync the model with the database
  
      await Topic.bulkCreate(topicData); // Insert the seed data into the "Topic" table
  
      console.log('Topics seeded successfully.');
      process.exit(0); // Exit the process
    } catch (err) {
      console.error('Error seeding topics:', err);
      process.exit(1); // Exit the process with an error
    }
  };
  
  seedTopics();