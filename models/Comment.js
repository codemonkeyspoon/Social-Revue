const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        replying_to: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'comment',
            //     key: 'id'
            // }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        text: {
            type: DataTypes.INTEGER,
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
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }
);

module.exports = Comment;