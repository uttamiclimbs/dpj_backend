const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  }, city: {
    type: String
  },

})

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
  banner: {
    type: String
  },
  profile: {
    type: String
  },
  address: addressSchema,
  email: {
    type: String,
    required: true
  },
  dob: {
    type: String
  },
  category: {
    type: String
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
  accountType: {
    type: String,
    enum: ["artist", "professional", "guest", "admin"], // Replace with your allowed values
  },
  documentType: {
    type: String
  },
  document: {
    type: String,
  },
  verified: {
    type: Boolean,
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