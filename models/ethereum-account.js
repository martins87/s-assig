const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ethAccountSchema = new Schema({
    address: String,
    userId: String,
    balance: String,
    description: String
})

const EthereumAccount = mongoose.model('eth-accounts', ethAccountSchema)

module.exports = EthereumAccount