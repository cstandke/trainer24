const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  userId: String,
  type: String
  //role: { type: String, enum: ["Trainer", "Trainee"] }
  //oder: user.create type trainer oder artist in auth files
});

const User = mongoose.model("User", userSchema);

module.exports = User;
