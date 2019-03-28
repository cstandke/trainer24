const express = require("express");
const offers = express.Router();

const Offer = require("../models/basic-offer");

// include CLOUDINARY:
const uploader = require("../configs/cloudinary");
// const IncomingForm = require('formidable').IncomingForm

//creates new offer
offers.post("/create", (req, res, next) => {
  console.log("AT create offer", req.body);
  const { offername, offertype, imageUrl } = req.body;
  const offerowner = req.body.loggedInUser._id;

  const aNewOffer = new Offer({
    offername: offername,
    offertype: offertype,
    offerowner: offerowner,
    imageUrl: imageUrl
  });

  //use promise syntax here
  aNewOffer
    .save()
    .then(savedOffer => {
      res.status(200).json({
        offer: savedOffer
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: err
      });
    });

  // aNewOffer.save(err => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).json({ message: "Saving offer to database went wrong" });
  //     return;
  //   }
  // });
});

//edit existing offer
offers.post("/edit/:id", (req, res, next) => {
  Offer.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        offername: req.body.offername,
        offerdescription: req.body.offerdesciption,
        offertype: req.body.offertype
      }
    },
    { new: true }
  )
    .then(updatedOffer => {
      res.status(200).json({
        offer: updatedOffer
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: err
      });
    });
});

//delete existing offer
offers.post("/delete/:id", (req, res, next) => {
  Offer.findByIdAndDelete({ _id: req.params.id })
    .then(message => {
      res.status(200).json({
        message: "Offer deleted"
      });
    })
    .catch(err => {
      console.log(400).json({
        error: err
      });
    });
});

offers.post("/imageupload", uploader.single("imageUrl"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

module.exports = offers;
