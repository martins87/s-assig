const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transactionSchema = new Schema({

})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction