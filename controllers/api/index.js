const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const userRoutes = require('./user-routes');
const topicRoutes = require('./topic-routes');
const commentRoutes = require('./comment-routes')
const postRoutes = require('./post-routes')

router.use('/categories', categoryRoutes);
router.use('/users', userRoutes);
// router.use('/topics', topicRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;