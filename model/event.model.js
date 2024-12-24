const mongoose = require("mongoose")
const eventschema = mongoose.Schema({
    address: String,
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
    startDateTime: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDateTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Event", "Collaboration"]

    },
    eventType: {
        type: String,
        required: true,
        enum: ["Physical", "Virtual"]
    },
    CreatedAt: { type: Date, default: Date.now } // Save The Time When the following Job was created 
})

const EventModel = mongoose.model("Events", eventschema);
module.exports = { EventModel };