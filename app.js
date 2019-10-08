const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
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

app.get('/', (req, res) => {
    res.render('index', { title: 'Salamantex' })
})

const port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})