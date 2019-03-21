const express = require("express");
const router = express.Router();
const axios = require("axios");
// import axios from "axios";

/* GET home page */
router.get("/", (req, res, next) => {
  // res.render('index');
  // res.send("Courses response");

  axios
    .get("https://www.udemy.com/api-2.0/courses", {
      auth: {
        username: process.env.UDEMY_API_ID,
        password: process.env.UDEMY_API_SECRET
      }
    })
    .then(response => res.json(response.data))
    .catch(error => res.json(error));
});

module.exports = router;
