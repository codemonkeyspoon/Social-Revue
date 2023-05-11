const { Model, DataTypes, Sequelize } = require('sequelize')

const sequelize = require('../config/connection');

const { v4: uuidv4 } = require('uuid'); // Import the UUID v4 generator

class Score extends Model { }

Score.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4()
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'score',
      }
);

module.exports = Score;