const mongoose = require("mongoose")
const ticketSchema = mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    CreatedAt: { type: Date, default: Date.now }, // Save The Time When the following Job was created 
})
const TicketModel = mongoose.model("tickets",ticketSchema)
module.exports = {TicketModel}