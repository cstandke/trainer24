const express = require("express");
const router = express.Router();
const axios = require("axios");
const Offer = require("../models/basic-offer");

let courseResult = function(title,details,imageUrl,link){
  this.courseTitle = title;
  this.courseDetails = details;
  this.courseImage = imageUrl;
  if (udemyTestMode) this.courseLink= "https://www.udemy.com"+link 
  else this.courseLink= link;
}

let resultArray = [];
const udemyTestMode = false;


/* GET home page */
router.get("/", (req, res, next) => {
  // res.render('index');
  // res.send("Courses response");
  if (udemyTestMode) {
    axios
      .get("https://www.udemy.com/api-2.0/courses", {
        auth: {
          username: process.env.UDEMY_API_ID,
          password: process.env.UDEMY_API_SECRET
        }
      })
      .then(response => {
        // console.log(response.data.results)
        resultArray = response.data.results.map(el => {
          return new courseResult(el.published_title,el.title,el.image_240x135,el.url)
        });
        // console.log(resultArray);
        // res.json(response.data)
        res.json(resultArray);
        
        })
      .catch(error => res.json(error));
  } else {
    Offer.find()
      .then(offers => {
        resultArray = offers.map(el => {
          return new courseResult(el.offername,el.offertype)
        });
        res.json(resultArray);
      })
      .catch(err => {
        res.json(err);
      });
  }
});

module.exports = router;
