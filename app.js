const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')

const dbUrl = 'mongodb://localhost:27017/salamantex'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) {
        console.log('There was an error connecting to the database')
        console.log(err)
    }

    console.log('We are connected to the database')
})

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', { title: 'Salamantex' })
})

app.get('/create-user', (req, res) => {
    res.render('create-user', { title: 'Create User' })
})

app.post('/create-user', (req, res) => {
    var data = req.body
    console.log("User name: ", data.name)
    console.log("description: ", data.description)
    console.log("email: ", data.email)
    console.log("bitcoinWalletId: ", data.bitcoinWalletId)
    console.log("ethereumWalletId: ", data.ethereumWalletId)
    console.log("maxAmountAllowed: ", data.maxAmountAllowed)

    User.create({
        id: "101",
        name: data.name,
        description: data.description,
        email: data.email,
        bitcoinWalletId: data.bitcoinWalletId,
        bitcoinBalance: "0",
        ethereumWalletId: data.ethereumWalletId,
        etherBalance: "0",
        maxAmountAllowed: data.ethereumWalletId,
    }, (err, data) => {
        if(err) {
            console.log('There was a problem adding a document to users collection')
            console.log(err)
        } else {
            console.log('Data successfully added to database:')
            console.log(data)
        }

    })

    res.render('create-user', { title: 'Create User' })
})

const port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})