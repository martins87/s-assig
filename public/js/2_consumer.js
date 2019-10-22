const express = require('express')
const amqp = require('amqplib/callback_api')

const cloudamqpURL = 'amqp://tvreunjr:It10Yr2NXk5VMemIibOZg2fctMS9oUwO@prawn.rmq.cloudamqp.com/tvreunjr'

const app = express()

/**
 * Here we have to use node.js with web3 as a backend service
 * https://davekiss.com/ethereum-web3-node-tutorial/
 * https://medium.com/coinmonks/ethereum-tutorial-sending-transaction-via-nodejs-backend-7b623b885707
 * need: web3, express, ethereumjs-tx
 */

/**
 * This will be the transaction processor that will run in parallel to the backend service
 */
amqp.connect(cloudamqpURL, (err, conn) => {
    conn.createChannel((err, ch) => {
        var queue = 'transactions'
        ch.assertQueue(queue, {durable: false})
        console.log('Waiting for messages in %s queue. Press Ctrl + C to exit', queue)

        ch.consume(queue, (msg) => {
            var txObject = JSON.parse(msg.content)
            console.log('Message received (object): ', txObject)

            // process transaction received...
            // 0xb4711e067096B404356D93568EB8aa6b8dA528E6
            web3.eth.sendTransaction(DOMObject, (err, txHash) => {
                if(err) {
                    console.log('There was an error broadcasting the transaction')
                    console.log(err)
                } else {
                    console.log('Your transaction was broadcasted: ' + txHash)
                }
            })

        }, {noAck: true})
    })
})