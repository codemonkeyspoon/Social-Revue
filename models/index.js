const User = require('./User');
const Category = require('./Category');
const Topic = require('./Topic');
const Post = require('./Post');
const Comment = require('./Comment');


User.hasMany(Post, {
    foreignKey : 'user_id',
    onDelete: 'CASCADE'
})
Post.belongsTo(User, {
    foreignKey: 'user_id'
})
Post.hasOne(Topic, {
    foreignKey: 'topic_id'
})
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Category.hasMany(Topic, {
    foreignKey: 'category_id'
})
Topic.belongsTo(Category, {
    foreignKey: 'category_id'
})

module.exports = {
    User,
    Category,
    Topic,
    Post,
    Comment
};
