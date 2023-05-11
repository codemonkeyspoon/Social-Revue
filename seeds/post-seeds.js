const { faker } = require('@faker-js/faker');
const { User, Post } = require('../models');

const postSeeds = async () => {
  // get all users
  const users = await User.findAll();

  // create an array to hold posts
  const posts = [];

  // loop through users and create posts for each user
  users.forEach(user => {
    const numPosts = faker.datatype.number({ min: 1, max: 5 }); // generate random number of posts between 1 and 5
    for (let i = 0; i < numPosts; i++) {
      const title = faker.lorem.sentence();
      const postContent = faker.lorem.paragraphs(1);
      const userId = user.id;
      posts.push({ title, post_content: postContent, user_id: userId,});
    }
  });

  // insert posts into database
  await Post.bulkCreate(posts);
  console.log('Post seeds have been planted!');
};

module.exports = postSeeds;