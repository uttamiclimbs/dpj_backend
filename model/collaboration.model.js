const mongoose = require("mongoose")
const CollabSchema = mongoose.Schema({
    userId: String,
    email: String,
    name: String,
    amount: Number,
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
    eventId: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now } // Save The Time When the following Job was created 
})
const CollabModel = mongoose.model("Collab", CollabSchema)
module.exports = { CollabModel }