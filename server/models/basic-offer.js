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
  offerowner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  imageUrl: { type: String, default: "/images/courses.png" },
  fileUrl: { type: String, default: "/images/courses.png" },
  udemyId: { type: String, default: "567828" },
  udemyUrl: { type: String, default: "/complete-python-bootcamp/" }
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
