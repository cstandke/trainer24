const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/basic-user");

// POST route => to create a new user-type trainer
// check if user email or username already exists, if not then create new user

authRoutes.post("/signup", (req, res, next) => {
  const { username, password, firstname, lastname, email } = req.body;

  if (!username || !password || !firstname || !lastname || !email) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  //   if(password.length < 5){
  //     res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
  //     return;
  // }

  // $or: [{ username: req.body.username }, { email: req.body.email }]

  User.findOne(
    { $or: [{ username: req.body.username }, { email: req.body.email }] },
    (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "We couldn't find this user" });
        return;
      }

      if (foundUser) {
        res.status(400).json({
          message: "Username or email are already taken,  choose another one"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        username: username,
        password: hashPass,
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email
      });

      aNewUser.save(err => {
        if (err) {
          res
            .status(400)
            .json({ message: "Saving user to database went wrong" });
          return;
        }

        // Automatically log in user after sign up
        // .login() here is actually predefined passport method
        req.login(aNewUser, err => {
          if (err) {
            res.status(500).json({ message: "Login after signup didn't work" });
            return;
          }

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          // CHANGE THIS dont send password to frontend

          res.status(200).json(aNewUser);
        });
      });
    }
  );
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong with your authentication" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save didn't work" });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

//replace this with dashboard??

authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRoutes;
