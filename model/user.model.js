const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String
  },
  address: {
    type: String
  }
})

const socialSchema = new Schema({
  facebook: {
    type: String,
  },
  linkdein: {
    type: String,
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  }
})


const userschema = mongoose.Schema({
  // Enable & Disable Account
  verified: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // Basic Details Common for all Account Types
  name: {
    type: String,
    required: true,
  },
  banner: {
    type: String
  },
  profile: {
    type: String
  },
  address: addressSchema,
  sociallinks: socialSchema,
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
  accountType: {
    type: String,
    enum: ["artist", "professional", "guest", "admin"], // Replace with your allowed values
  },
  dob: {
    type: String
  },
  category: {
    type: String
  },
  documentType: {
    type: String
  },
  document: {
    type: String,
  },

  // Artist Specific Details
  gender: {
    type: String
  },
  skills: {
    type: [String]
  },
  // Professional Specific Details
  companycategory: {
    type: String
  },
  CreatedAt: { type: Date, default: Date.now },
});
const UserModel = mongoose.model("Users", userschema);
module.exports = { UserModel };