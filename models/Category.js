const { Model, DataTypes, Sequelize } = require('sequelize')

const sequelize = require('../config/connection');

const { v4: uuidv4 } = require('uuid'); // Import the UUID v4 generator

class Category extends Model { }

Category.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4()
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category',
      }
);

module.exports = Category;