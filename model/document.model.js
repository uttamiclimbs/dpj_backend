const mongoose = require("mongoose");
const documentschema = mongoose.Schema({
  documentType:{
    type:String
  },
  document:{
    type:String,
  },
  userId :{
    type:String
  },
  verified:{
    type:Boolean,
    default: false
  },
  CreatedAt: { type: Date, default: Date.now },
});
const DocumentModel = mongoose.model("Documents", documentschema);
module.exports = { DocumentModel };