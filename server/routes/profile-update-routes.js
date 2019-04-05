const express = require("express");
const profileUpdateRoutes = express.Router();

const User = require("../models/basic-user");

// include CLOUDINARY:
const uploader = require("../configs/cloudinary");

// profile/:id/edit
profileUpdateRoutes.post("/profile/edit", (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(
      // { _id: req.params.id },
      { _id: req.user._id },
      {
        $set: {
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          occupation: req.body.occupation,
          description: req.body.description,
          image: req.body.imageUrl
        }
      },
      { new: true }
    )
      .then(updatedUser => {
        res.status(200).json({
          User: updatedUser
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          error: err
        });
      });
  }
});

profileUpdateRoutes.post(
  "/imageupload",
  uploader.single("imageUrl"),
  (req, res, next) => {
    console.log("file is: ", req.file);

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
  }
);

//show details for one user
profileUpdateRoutes.get("/:id", (req, res, next) => {
  // let reqUser = null;
  if (req.user) req.user = req.user._id;
  console.log(req.user);
  User.findById({ _id: req.params.id })
    .then(theUser => {
      res.status(200).json({
        firstName: theUser.firstname,
        lastName: theUser.lastname,
        description: theUser.description,
        occupation: theUser.occupation,
        imageUrl: theUser.image
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

module.exports = profileUpdateRoutes;
