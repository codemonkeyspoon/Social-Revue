const { Model, DataTypes, Sequelize } = require('sequelize')

const sequelize = require('../config/connection');

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
        up_score: {
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        down_score: {
            type:DataTypes.INTEGER,
            defaultValue: 0
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