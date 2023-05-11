const router = require('express').Router();
const { Comment ,Score } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Increase score by one for a comment
router.put('/:id/like', withAuth, (req, res) => {
  if (req.session) {
    Score.create({
      score: 1,
      user_id: req.session.user_id,
      comment_id: req.params.id,
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

// Decrease score by one for a comment
router.put('/:id/dislike', withAuth, (req, res) => {
  if (req.session) {
    Score.create({
      score: -1,
      user_id: req.session.user_id,
      comment_id: req.params.id,
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