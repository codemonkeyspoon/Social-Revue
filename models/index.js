const Category = require('./Category');
// const Topic = require('./Topic');
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const Score = require('./Score'); // Add the Score model import

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

// Category.hasMany(Topic, {
//   foreignKey: 'category_id'
// });

// Topic.belongsTo(Category, {
//   foreignKey: 'category_id'
// });

// Add the Score relations
User.hasMany(Score, {
  foreignKey: 'user_id'
});

Score.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Score, {
  foreignKey: 'post_id'
});

Score.belongsTo(Post, {
  foreignKey: 'post_id'
});

Comment.hasMany(Score, {
  foreignKey: 'comment_id'
});

Score.belongsTo(Comment, {
  foreignKey: 'comment_id'
});

Category.hasMany(Post, {
  foreignKey: 'category_id'
});

Post.belongsTo(Category, {
  foreignKey: 'category_id'
});


module.exports = { User, Category, Post, Comment, Score }; // Include the Score in the exported models