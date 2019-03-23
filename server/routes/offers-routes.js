const express = require("express");
const offers = express.Router();

const Offer = require("../models/basic-offer");

//creates new offer
offers.post("/create", (req, res, next) => {
  console.log("AT create offer", req.body);
  const { offername, offertype } = req.body;
  const offerowner = req.body.loggedInUser._id;

  const aNewOffer = new Offer({
    offername: offername,
    offertype: offertype,
    offerowner: offerowner
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

module.exports = offers;
