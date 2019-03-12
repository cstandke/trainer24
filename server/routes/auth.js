const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/basic-user");

// POST route => to create a new user-type trainer
// check if user email or username already exists, if not then create new user

router.post("/signup-trainer", (req, res, next) => {
  // User.findOne({ username: req.body.username }).then(user => {
  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }]
  }).then(user => {
    if (user === null) {
      User.create({
        type: "trainer",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email
      })
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.send("The user already exists");
    }
  });
});

// POST route => to create a new user-type trainer

router.post("/signup-learner", (req, res, next) => {
  //  User.findOne({ email = user.email }).then(user => {

  // if (user === null) {
  User.create({
    type: "learner",
    firstname: String,
    lastname: String,
    username: String,
    email: String
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route => to get all the user
router.get("/users", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then(allTheProjects => {
      res.json(allTheProjects);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
