const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  offername: {
    type: String
  },
  offertype: {
    type: String
  },
  offerdescription: {
    type: String
  },
  location: String,
  offerowner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  imageUrl: { type: String },
  fileUrl: { type: String, default: "/components/images/courses.png" },
  udemyId: { type: String, default: "567828" },
  udemyUrl: { type: String, default: "/complete-python-bootcamp/" }
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
