// Require express, sequelize, Topic model, and withAuth
const router = require("express").Router();
const sequelize = require("../../config/connection");
const {Topic} = require("../../models");
const withAuth = require("../../utils/auth");

// GET all topics
router.get("/", (req, res) => {
    Topic.findAll(
        {
            attributes: [
                "id",
                "name",
                "description",
                "category_id"
            ],
            /* include: [
                {
                    model: Topic,
                    attributes: ["id", "topic_name"]
                }
            ] */
        }
    )
    .then(dbTopicData => res.json(dbTopicData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET a single topic
router.get("/:id", (req, res) => {
    Topic.findOne(
        {
            where: {
                id: req.params.id
            },
            attributes: [
                "id",
                "name",
                "description",
                "category_id"
            ]
        }
    )
    .then(dbTopicData => {
        if (!dbTopicData) {
            res.status(404).json({message: "No topic found with this ID"});
            return;
        }
        res.json(dbTopicData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE a new topic
router.post("/", withAuth, (req, res) => {
    Topic.create(
        {
            title: req.body.name,
            description: req.body.description
        }
    )
    .then(dbTopicData => res.json(dbTopicData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE a topic
/* router.put("/:id", withAuth, (req, res) => {}) */

// DELETE a topic
router.delete("/:id", withAuth, (req, res) => {
    console.log("id", req.params.id);
    Topic.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbTopicData => {
        if (!dbTopicData) {
            res.status(404).json({message: "No topic found with this ID"});
            return;
        }
        res.json(dbTopicData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Export router
module.exports = router;