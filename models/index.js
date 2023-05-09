const Category = require('./Category');
const Topic = require('./Topic');

const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id'
});



Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
Category.hasMany(Topic, {
  foreignKey: 'category_id'
})
Topic.belongsTo(Category, {
  foreignKey: 'category_id'
})

module.exports = { User, Category, Topic, Post, Comment };