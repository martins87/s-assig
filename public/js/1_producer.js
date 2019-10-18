const amqp = require('amqplib/callback_api')

const cloudamqpURL = 'amqp://tvreunjr:It10Yr2NXk5VMemIibOZg2fctMS9oUwO@prawn.rmq.cloudamqp.com/tvreunjr'
var txObject = {"from":"0xd430224b5887ac53dedf1ab1a8658446473c9f5c","to":"0xb4711e067096B404356D93568EB8aa6b8dA528E6","value":"0","data":"0x44616e69656c204d617274696e73","gas":30000}

amqp.connect(cloudamqpURL, (err, conn) => {
    conn.createChannel((err, ch) => {
        if(err) {
            console.log('Error creating the channel')
            return console.log(err)
        }

        var queue = 'transactions'
        var msg = JSON.stringify(txObject)
        ch.assertQueue(queue, {durable: false})
        console.log('Queue: ' + queue)

        setInterval(() => {
            ch.sendToQueue(queue, Buffer.from(msg))
            console.log('Message sent: ' + msg)
        }, 3000)

        // setTimeout(() => {
        //     conn.close(); process.exit(0)
        // }, 60000)
    })
})