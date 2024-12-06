const mongoose = require("mongoose")
const eventschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        enum: ["Event", "Collaboration"]
    },
    CreatedAt: { type: Date, default: Date.now } // Save The Time When the following Job was created 
})

const EventModel = mongoose.model("Events", eventschema);
module.exports = { EventModel };