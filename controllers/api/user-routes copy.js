const router = require('express').Router();
const { User, Category, Topic, Post, Comment } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{model: Post}]
        });

        res.status(200).json(userData);
    } catch (err) {

        res.status(500).json(err)
    }
});

module.exports = router;