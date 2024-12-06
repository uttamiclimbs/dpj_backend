const mongoose = require("mongoose")
const transactionSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Credit", "Debit"], // Credit Means Amount is being Added To Your Account & Debit Means Amount is being Deducted From Your Account. 
        default: "Credit"
    },
    userId: {
        type: String,
        required: true
    },
    method: String,
    refNo: String,
    from: String,
    to: String,
    eventId: String,
    CreatedAt: { type: Date, default: Date.now }, // Save The Time When the following Job was created 
})

const TransactionModel = mongoose.model("Transactions", transactionSchema)
module.exports = { TransactionModel }