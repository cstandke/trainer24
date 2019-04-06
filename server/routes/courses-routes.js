// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const Offer = require("../models/basic-offer");


// let resultArray = [];
// const udemyTestMode = false;

// //show details for one offer
// router.get("/:id", (req, res, next) => {
//   Offer.findById({ _id: req.params.id }).populate("offerowner")
//     .then(theOffer => {  
//       res.status(200).json(
//         new courseResult(
//           theOffer.offername,
//           theOffer.offertype,
//           theOffer.imageUrl,
//           theOffer._id,
//           theOffer.offerowner,
//           theOffer.fileUrl,
//           theOffer.udemyId,
//           theOffer.udemyUrl
//         ))
//     })
//     .catch(err => {
//       res.status(400).json({
//         error: err
//       });
//     });
// })


// /* GET list of all offers */
// router.get("/", (req, res, next) => {
//   // res.render('index');
//   // res.send("Courses response");
//   if (udemyTestMode) {
//     axios
//       .get("https://www.udemy.com/api-2.0/courses", {
//         auth: {
//           username: process.env.UDEMY_API_ID,
//           password: process.env.UDEMY_API_SECRET
//         }
//       })
//       .then(response => {
//         // console.log(response.data.results)
//         resultArray = response.data.results.map(el => {
//           return new courseResult(el.published_title,el.title,el.image_240x135,el.url)
//         });
//         // console.log(resultArray);
//         // res.json(response.data)
//         res.json(resultArray);
        
//         })
//       .catch(error => res.json(error));
//   } else {
//     Offer.find().populate('offerowner')
//       .then(offers => {
//         resultArray = offers.map(el => {
//           // console.log(el);
//           return new courseResult(
//             el.offername,
//             el.offertype,
//             el.imageUrl,
//             el._id,
//             el.offerowner,
//             el.fileUrl,
//             el.udemyId,
//             el.udemyUrl)
//         });
//         res.json(resultArray);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   }
// });

// module.exports = router;
