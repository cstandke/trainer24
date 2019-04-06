const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },

  description: String,
  occupation: String,

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  userId: String,
  type: String,

  imageUrl: { type: String }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
