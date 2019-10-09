const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transactionSchema = new Schema({
    id: String,
    currencyAmount: String,
    currencyType: String,
    sourceUserId: String,
    targetUserId: String,
    timestampCreated: String,
    timestampProcessed: String,
    state: String,
})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction