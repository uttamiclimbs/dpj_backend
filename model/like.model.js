const mongoose = require("mongoose");
const likeschema = mongoose.Schema({
    likedBy: { // Save Detailed Description of Job & basic detail about the job
        type: Array,
        required: true
    },
    postId: { type: String, required: true }, // Save The Post ID for which this Post was Liked
    CreatedAt: { type: Date, default: Date.now }, // Save The Time When the following Job was created 

});
const LikeModel = mongoose.model("likes", likeschema);
module.exports = { LikeModel };