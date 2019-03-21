const express = require("express");
const offers = express.Router();

const Offer = require("../models/basic-offer");

offers.post("/createoffer", (req, res, next) => {
  const { offername, offertype } = req.body;
  // const offerowner = req.body.loggedInUser

  Offer.findOne({ offername: req.body.offername }, (err, foundOffer) => {
    if (foundOffer) {
      res.status(400).json({
        message: "The name already exist. Choose another one"
      });
      return;
    }

    const aNewOffer = new Offer({
      offername: offername,
      offertype: offertype
      // offerowner: offerowner
    });

    aNewOffer.save(err => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json({ message: "Saving offer to database went wrong" });
        return;
      }

      // Send the user's information to the frontend
      // We can use also: res.status(200).json(req.user);
      // CHANGE THIS dont send password to frontend

      res.status(200).json(aNewOffer);
    });
  });
});

module.exports = offers;
