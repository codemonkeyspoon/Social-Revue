const { Comment, User, Post } = require('../models');
const { faker } = require('@faker-js/faker');

const commentSeeds = async () => {
  // get all users and posts
  const users = await User.findAll();
  const posts = await Post.findAll();

  // create an array to hold comments
  const comments = [];

  // loop through posts and create comments for each post
  posts.forEach(post => {
    const numComments = faker.datatype.number({ min: 1, max: 5 }); // generate random number of comments between 1 and 5
    for (let i = 0; i < numComments; i++) {
      const text = faker.lorem.words(faker.datatype.number({ min: 1, max: 50 }));
      const userId = faker.helpers.arrayElement(users).id;
      const postId = post.id;
      comments.push({ post_id: postId, user_id: userId, text,});
    }
  });

  // insert comments into database
  await Comment.bulkCreate(comments);
  console.log('Comment seeds have been planted!');
};

module.exports = commentSeeds;