const { Score, User, Post, Comment } = require('../models');
const { faker } = require('@faker-js/faker');

const scoreSeeds = async () => {
  // Get all users, posts, and comments
  const users = await User.findAll();
  const posts = await Post.findAll();
  const comments = await Comment.findAll();

  // Generate and insert score data into the database using the Score model
  const scores = [];

  // Generate scores for each user, post, and comment
  users.forEach(user => {
    posts.forEach(post => {
      const score = faker.helpers.arrayElement([1, -1]);
      scores.push({ user_id: user.id, post_id: post.id, score });
    });

    comments.forEach(comment => {
      const score = faker.helpers.arrayElement([1, -1]);
      scores.push({ user_id: user.id, comment_id: comment.id, score });
    });
  });

  await Score.bulkCreate(scores);
  console.log('Score seeds have been planted!');
};

module.exports = scoreSeeds;