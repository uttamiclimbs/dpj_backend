const mongoose = require("mongoose")
const walletSchema = mongoose.Schema({
    balance: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

const WalletModel = mongoose.model("Wallet", walletSchema)
module.exports = { WalletModel }