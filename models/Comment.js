const { Model, DataTypes, Sequelize } = require('sequelize')

const sequelize = require('../config/connection');

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