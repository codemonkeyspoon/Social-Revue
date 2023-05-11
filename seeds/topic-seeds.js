const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/connection');
const Category = require('../models/Category');




const categoryData = [
  {
    
    category_name: "Games",
    
  },
  {
    
    category_name: "Movies",
    
  },
  {
    
    category_name: "Music",
    
  },
  {
    
    category_name: 'News',
    
  },
  {
    
    category_name: 'Food',
    
  },
  {
    
    category_name: 'Lifestyle',
    
  },
];


const seedTopics = async () => {
    try {
      await sequelize.sync({ force: false }); // Sync the model with the database
  
      await Category.bulkCreate(categoryData); // Insert the seed data into the "category" table
  
      console.log('Topics seeded successfully.');
      process.exit(0); // Exit the process
    } catch (err) {
      console.error('Error seeding topics:', err);
      process.exit(1); // Exit the process with an error
    }
  };
  
  seedTopics();