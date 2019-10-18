const amqp = require('amqplib/callback_api')

const cloudamqpURL = 'amqp://tvreunjr:It10Yr2NXk5VMemIibOZg2fctMS9oUwO@prawn.rmq.cloudamqp.com/tvreunjr'

amqp.connect(cloudamqpURL, (err, conn) => {
    conn.createChannel((err, ch) => {
        var queue = 'transactions'
        ch.assertQueue(queue, {durable: false})
        console.log('Waiting for messages in %s queue. Press Ctrl + C to exit', queue)
        ch.consume(queue, (msg) => {
            console.log('Message received: ' + msg.content)
        }, {noAck: true})
    })
})