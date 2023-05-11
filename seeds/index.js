const seedUsers = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');
const scoreSeeds = require('./score-seeds');

(async () => {
  await seedUsers();
  await postSeeds();
  await commentSeeds();
  await scoreSeeds();
  console.log('All seeds have been planted!');
  process.exit(0);
})();