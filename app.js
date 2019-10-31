const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const amqp = require('amqplib/callback_api')
const User = require('./models/user')
const EthereumAccount = require('./models/ethereum-account')

// const dbUrl = 'mongodb://localhost:27017/salamantex'
const dbUrl = 'mongodb://admin:salamantex123@ds241408.mlab.com:41408/salamantex'
const cloudamqpURL = 'amqp://tvreunjr:It10Yr2NXk5VMemIibOZg2fctMS9oUwO@prawn.rmq.cloudamqp.com/tvreunjr'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) {
        console.log('There was an error connecting to the database')
        return console.log(err)
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

app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err) {
            console.log('There was a problem retrieving the users from the database')
            console.log(err)
        } else {
            console.log(users)
            res.render('users', {
                title: 'Users',
                users: users
            })
        }
    })
})

app.get('/users/:id', (req, res) => {
    var id = req.params.id

    User.findById(id, (err, user) => {
        if(err) {
            console.log('There was a problem retrieving the user from the database')
            console.log(err)
        } else {
            console.log('User found:\n' + user)

            res.render('user', {
                id: id,
                name: user.name,
                description: user.description,
                email: user.email,
                bitcoinWalletId: user.bitcoinWalletId,
                bitcoinBalance: user.bitcoinBalance,
                ethereumWalletId: user.ethereumWalletId,
                etherBalance: user.etherBalance,
                maxAmountAllowed: user.maxAmountAllowed
            })
        }
    })
})

app.get('/create-user', (req, res) => {
    res.render('create-user', { title: 'Create User' })
})

app.get('/add-account', (req, res) => {
    res.render('add-account', { title: 'Add Account' })
})

app.post('/create-user', (req, res) => {
    var data = req.body

    User.create({
        // id: mongoose.Types.ObjectId.toString,
        name: data.name,
        description: data.description,
        email: data.email,
        bitcoinWalletId: data.bitcoinWalletId,
        bitcoinBalance: "0",
        ethereumWalletId: data.ethereumWalletId,
        etherBalance: "0",
        maxAmountAllowed: data.maxAmountAllowed,
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

app.post('/add-account', (req, res) => {
    var data = req.body

    EthereumAccount.create({
        address: data.ethereumAddress,
        balance: data.accountBalance,
        description: data.accountDescription,
    }, (err, data) => {
        if(err) {
            console.log('There was a problem adding a document to eth-accounts collection')
            console.log(err)
        } else {
            console.log('Data successfully added to database:')
            console.log(data)
        }
    })

    res.render('index', { title: 'Salamentex' })
})

// Get the transaction submitted and add it to queue
app.post('/submit-transaction', (req, res) => {
    var formData = req.body
    
    let txObject = {
        // from: formData.from,
        to: formData.to,
        value: formData.value,
        data: formData.hexData,
        gas: formData.gas
    }

    console.log('Transaction object received: ', txObject)

    // submit/add transaction to queue
    amqp.connect(cloudamqpURL, (err, conn) => {
        if(err) {
            console.log('There was and error connecting to the cloud amqp')
            return console.log(err)
        } else {
            conn.createChannel((err, ch) => {
                if(err) {
                    console.log('Error creating the channel')
                    return console.log(err)
                }

                var queue = 'transactions'
                ch.assertQueue(queue, {durable: false})

                // converts the transaction object to a string
                var msg = JSON.stringify(txObject)

                // submits transaction object as a string to the queue
                ch.sendToQueue(queue, Buffer.from(msg))

                console.log('Message added to queue: ' + msg)
            })
        }
    })

    res.render('submit-transaction', { title: 'Submit Transaction' })
})


app.get('/submit-transaction', (req, res) => {
    res.render('submit-transaction', { title: 'Submit Transaction' })
})

const port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})