const router = require('express').Router();
const { User, Category, Topic, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();

        res.status(200).json(postData);
    } catch (err) {

        res.status(500).json(err)
    }
});

module.exports = router;