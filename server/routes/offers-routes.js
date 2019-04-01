const express = require("express");
const offers = express.Router();
const axios = require("axios");
const Offer = require("../models/basic-offer");
const CourseParticipant = require("../models/course-participant");

// include CLOUDINARY:
const uploader = require("../configs/cloudinary");
// const IncomingForm = require('formidable').IncomingForm

let resultArray = [];
const udemyTestMode = false;

let courseResult = function(
  title,
  type,
  details,
  imageUrl,
  link,
  owner,
  fileUrl,
  udemyId,
  udemyUrl,
  isJoined
) {
  this.courseTitle = title;
  this.courseType = type;
  this.courseDetails = details;
  // this.courseLocation = location;
  this.courseImage = imageUrl;
  // this.courselink = link;
  if (udemyTestMode) this.courseLink = "https://www.udemy.com" + link;
  else this.courseLink = "/OfferDetail/" + link;
  if (owner) {
    this.courseOwner = owner.firstname + " " + owner.lastname;
    this.ownerProfileLink = "/profile/" + owner._id;
  } else this.courseOwner = "Nobody";
  this.courseFile = fileUrl;
  this.udemyId = udemyId;
  this.udemyUrl = udemyUrl;
  this.isJoined = isJoined;
};

//creates new offer
offers.post("/create", (req, res, next) => {
  console.log("AT create offer", req.body);
  const { offername, offertype, offerdescription, imageUrl } = req.body;
  const offerowner = req.body.loggedInUser._id;

  const aNewOffer = new Offer({
    offername: offername,
    offertype: offertype,
    offerdescription: offerdescription,
    imageUrl: imageUrl,
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
        offerdescription: req.body.offerdescription,
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

//POST to join a course
offers.post("/join", (req, res, next) => {
  const aNewParticipant = new CourseParticipant({
    courseId: req.query.courseId,
    // participantId:req.query.userId
    participantId: req.user._id
  });
  if (!aNewParticipant.courseId || !aNewParticipant.participantId)
    return res
      .status(400)
      .json({ error: "All requrired fields must be filled!" });
  CourseParticipant.findOne({
    courseId: req.query.courseId,
    participantId: req.user._id
  })
  .then(foundRecord => {
    if (foundRecord) return res.status(200).json({record:foundRecord})
    aNewParticipant
    .save()
    .then(savedRecord => {
      res.status(200).json({ record: savedRecord });
    })
    .catch(err => res.status(400).json({ error: err }));
  }).catch(err => res.status(400).json({ error: err }));
  // res.send(aNewMember);
});

offers.get("/myCourses", (req, res, next) => {
  // res.render('index');
  // res.send("Courses response");
    // let queryParams = {};
    // if (req.query.ownerId) queryParams = { offerowner: req.query.ownerId };
    CourseParticipant.find({participantId:req.user._id})
    // Offer.find(queryParams)
      .populate("courseId")
      .then(offers => {
        resultArray = offers.map(el => {
          console.log(el);
          return new courseResult(
            el.courseId.offername,
            el.courseId.offertype,
            el.courseId.offerdescription,
            el.courseId.imageUrl,
            el.courseId._id,
            el.courseId.offerowner,
            el.courseId.fileUrl,
            el.courseId.udemyId,
            el.courseId.udemyUrl
          );
        });
        res.json(resultArray);
      })
      .catch(err => {
        res.json(err);
      });
});

//show details for one offer
offers.get("/:id", (req, res, next) => {
  let isJoined = false;
  Offer.findById({ _id: req.params.id })
    .populate("offerowner")
    .then(theOffer => {
      CourseParticipant.findOne({
        courseId: theOffer._id,
        participantId: req.user._id
      })
        .then(joinedCourse => {
          if (joinedCourse) isJoined = true;
          res
            .status(200)
            .json(
              new courseResult(
                theOffer.offername,
                theOffer.offertype,
                theOffer.offerdescription,
                theOffer.imageUrl,
                theOffer._id,
                theOffer.offerowner,
                theOffer.fileUrl,
                theOffer.udemyId,
                theOffer.udemyUrl,
                isJoined
              )
            );
        })
        .catch(err => {
          res.status(400).json({
            error: err
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});



/* GET list of all offers */
offers.get("/", (req, res, next) => {
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
          return new courseResult(
            el.published_title,
            el.title,
            el.image_240x135,
            el.url
          );
        });
        // console.log(resultArray);
        // res.json(response.data)
        res.json(resultArray);
      })
      .catch(error => res.json(error));
  } else {
    let queryParams = {};
    if (req.query.ownerId) queryParams = { offerowner: req.query.ownerId };
    Offer.find(queryParams)
      .populate("offerowner")
      .then(offers => {
        resultArray = offers.map(el => {
          // console.log(el);
          return new courseResult(
            el.offername,
            el.offertype,
            el.offerdescription,
            el.imageUrl,
            el._id,
            el.offerowner,
            el.fileUrl,
            el.udemyId,
            el.udemyUrl
          );
        });
        res.json(resultArray);
      })
      .catch(err => {
        res.json(err);
      });
  }
});

module.exports = offers;
