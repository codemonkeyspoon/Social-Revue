const seedUsers = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');

(async () => {
  await seedUsers();
  await postSeeds();
  await commentSeeds();
  console.log('All seeds have been planted!');
  process.exit(0);
})();