const mongoose = require("mongoose");
const commentschema = mongoose.Schema({
    commentedBy: { // Save Detailed Description of Job & basic detail about the job
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    postId: { type: String, required: true }, // Save The Post ID for which this Post was Liked
    CreatedAt: { type: Date, default: Date.now }, // Save The Time When the following Job was created 

});
const LikeModel = mongoose.model("comment", commentschema);
module.exports = { LikeModel };