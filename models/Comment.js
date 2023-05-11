const { Model, DataTypes, Sequelize } = require('sequelize')

const sequelize = require('../config/connection');

const { v4: uuidv4 } = require('uuid'); // Import the UUID v4 generator

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4()
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        replying_to: {
            type: DataTypes.UUID,
            // references: {
            //     model: 'comment',
            //     key: 'id'
            // }
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        text: {
            type: DataTypes.STRING(500),
            allowNull: false
        },     
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }
);

module.exports = Comment;