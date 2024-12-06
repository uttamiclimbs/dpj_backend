const { json } = require("express")
const { WalletModel } = require("../model/wallet.model")
const { TransactionModel } = require("../model/transaction.model")

const addAmountinWallet = async (props) => {
    const { amount, userId, refNo, method } = props
    const wallet = await WalletModel.find({ userId: userId })
    wallet[0].balance = wallet[0].balance + amount

    try {
        await wallet[0].save()
    } catch (error) {
        return json({ status: 'error', message: `Failed To Add Balance in the Wallet ${error.message}` })
    }

    const transaction = new TransactionModel({ amount: amount, type: "Credit", userId: userId, refNo: refNo, method: method })

    try {
        await transaction.save()
    } catch (error) {
        return json({ status: 'error', message: `Failed To Add Balance in the Wallet ${error.message}` })
    }
}













module.exports = { addAmountinWallet }