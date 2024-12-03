const mongoose = require("mongoose");
const userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String
  },
  gender: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phoneno: {
    type: Number,
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: Number
  },
  signuptoken: {
    type: String
  },
  forgotpasswordtoken: {
    type: String
  },
  picture: {
    type: String
  },
  accountType: {
    type: String,
    enum: ["artist", "professional", "guest", "admin"], // Replace with your allowed values
  },
  documentType:{
    type:String
  },
  document:{
    type:String,
  },
  verified:{
    type:Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  CreatedAt: { type: Date, default: Date.now },
});
const UserModel = mongoose.model("Users", userschema);
module.exports = { UserModel };