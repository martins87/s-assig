const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    name: String,
    description: String,
    email: String,
    bitcoinWalletId: String,
    bitcoinBalance: String,
    ethereumWalletId: String,
    etherBalance: String,
    maxAmountAllowed: String
})

// users collection
// the users Model is based on this Schema
const User = mongoose.model('users', userSchema)

// exporting the model so it can be used outside this files
module.exports = User