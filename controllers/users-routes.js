const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment, Category, Score } = require("../models");
const withAuth = require("../utils/auth");

router.get("/:id", async (req, res) => {
  try {
    const [dbUserData, dbUsername] = await Promise.all([
      User.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "username"],
        include: [
          {
            model: Post,
            attributes: ["id", "title", "post_content", "created_at"],
            include: [
              {
                model: Comment,
                attributes: ["id", "text", "post_id", "user_id", "created_at"],
                include: {
                  model: User,
                  attributes: ["username"],
                },
              },
              {
                model: User,
                attributes: ['username']
              },
              {
                model: Category,
                attributes: ["category_name"],
                include: [
                  {
                    model: Post,
                    attributes: ["id"],
                  },
                ],
              },
            ],
          },
          {
            model: Comment,
            attributes: ["id", "text", "created_at"],
            include: {
              model: Post,
              attributes: ["title"],
              include: [
                {
                  model: User,
                  attributes: ["username"],
                },
              ],
            },
          },
        ],
      }),
      User.findOne({
        where: { id: req.params.id },
        attributes: ["username"],
      }),
    ]);

    const posts = dbUserData.get({ plain: true });
    const user = dbUsername.get({ plain: true });
    res.render("userpage", { posts, user, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
