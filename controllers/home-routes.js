const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Score, Category } = require('../models');

router.get('/', async (req, res) => {
  try {
    const categoryParam = req.query.category; // Get the category query parameter
    let categoryFilter = {}; // Define an empty object to store the category filter

    if (categoryParam && categoryParam !== 'all') {
      categoryFilter = { id: categoryParam }; // Set the category filter if a specific category ID is provided
    }

    const [dbPostData, dbCategoryData] = await Promise.all([
      Post.findAll({
        attributes: [
          'id',
          'title',
          'created_at',
          'post_content',
          [sequelize.literal('(SELECT SUM(score) FROM score WHERE score.post_id = Post.id)'), 'total_score'],
        ],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Score,
            attributes: ['score'],
          },
          {
            model: Category,
            attributes: ['category_name'],
            where: categoryFilter, // Apply the category filter to the Category model include
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['id', 'username'],
            },
          },
        ],
        order: [[sequelize.literal('total_score'), 'DESC']],
      }),
      Category.findAll({
        attributes: ['category_name', 'id'],
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
        ],
      })
    ]);

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    const categories = dbCategoryData.map((category) => category.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'created_at', 'post_content'],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'text',
          'post_id',
          'user_id',
          'created_at',
          [sequelize.fn('SUM', sequelize.col('comments->scores.score')), 'total_score'],
        ],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Score,
            as: 'scores',
            attributes: [],
          },
        ],
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
    group: ['post.id', 'comments.id', 'comments->user.id'],
    order: [[sequelize.literal('SUM(`comments->scores`.`score`)'), 'DESC']],
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('sign-up');
});

// increase score by one
router.put('/post/:id/like', (req, res) => {
  if (req.session) {
    Score.create({
      score: 1,
      user_id: req.session.user_id,
      post_id: req.params.id,
    })
      .then(dbScoreData => {
        if (!dbScoreData) {
          res.status(404).json({ message: 'No score found with this id' });
          return;
        }
        res.json(dbScoreData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// decrease score by one
router.put('/post/:id/dislike', (req, res) => {
  if (req.session) {
    Score.create({
      score: -1,
      user_id: req.session.user_id,
      post_id: req.params.id,
    })
      .then(dbScoreData => {
        if (!dbScoreData) {
          res.status(404).json({ message: 'No score found with this id' });
          return;
        }
        res.json(dbScoreData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;