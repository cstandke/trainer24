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
  fileUrl: { type: String},
  udemyId: { type: String},
  udemyUrl: { type: String}
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
