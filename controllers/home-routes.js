const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Score, Category } = require('../models');

router.get('/', (req, res) => {
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
      },
    ],
    order: [[sequelize.literal('total_score'), 'DESC']],
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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