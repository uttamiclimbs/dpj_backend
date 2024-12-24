const mongoose = require("mongoose");
const postschema = mongoose.Schema({
    createdBy: { type: String, required: true }, // Save The Professional ID by whom this Job was ceated
    description: { // Save Detailed Description of Job & basic detail about the job
        type: String,
        required: true
    },
    media: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now }, // Save The Time When the following Job was created 

});
const PostModel = mongoose.model("post", postschema);
module.exports = { PostModel };