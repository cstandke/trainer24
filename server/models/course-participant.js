const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Offer"
  },
  participantId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
  
const CourseParticipant = mongoose.model("CourseParticipant", participantSchema);

module.exports = CourseParticipant
;