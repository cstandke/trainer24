const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  offername: {
    type: String,
    required: true
  },
  offertype: {
    type: String,
    required: true
  }
  // offerowner: {
  //   type: ObjectId
  // }
  //the courses from the databObjectIdase that the offer relates to e.g. udemy
  // courseId: String,
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
