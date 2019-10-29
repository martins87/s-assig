/**
 * References for Ethereum + Node.js transactions
 * https://davekiss.com/ethereum-web3-node-tutorial/
 * https://medium.com/coinmonks/ethereum-tutorial-sending-transaction-via-nodejs-backend-7b623b885707
 */
const amqp = require('amqplib/callback_api')
const Web3 = require('web3')
const axios = require('axios')
const EthereumTx = require('ethereumjs-tx').Transaction

/**
 * URL for the cloud AMQP service.
 * All messages will be send to a queue that was created for this application.
 */
const cloudamqpURL = 'amqp://tvreunjr:It10Yr2NXk5VMemIibOZg2fctMS9oUwO@prawn.rmq.cloudamqp.com/tvreunjr'

/**
 * Ropsten Infura Project created for this application
 */
const ropsten = 'https://ropsten.infura.io/v3/de4a2c55653244c58c7af6e9c04089b5'

/**
 * This account was created for this application.
 * It has received initially 5 Ropsten Ether for the transactions.
 * To see transactions sent from this address just go to:
 * https://ropsten.etherscan.io/address/0x220339F638a2cE9A1a7143F2ee7d19999cBa13b8
 */
const WALLET_ADDRESS = '0x220339F638a2cE9A1a7143F2ee7d19999cBa13b8'
const WALLET_PRIVATE_KEY = '2B6B82C989C0A4C502B62F6AE9A9B815CC95A843A13B42B4C2A608403CAFBF71'
const web3 = new Web3(new Web3.providers.HttpProvider(ropsten))
web3.eth.defaultAccount = WALLET_ADDRESS

const main = async () => {
    // get the nonce
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount)

    let gasPrices = await getCurrentGasPrices()

    // handle the queue...
    amqp.connect(cloudamqpURL, (err, conn) => {
        conn.createChannel((err, ch) => {
            var queue = 'transactions'
            ch.assertQueue(queue, {durable: false})
            console.log('Waiting for messages in %s queue. Press Ctrl + C to exit', queue)
    
            // Consume messages
            ch.consume(queue, (msg) => {
                // Parse the message to an object
                var transaction = JSON.parse(msg.content)

                console.log('Message received (string):')
                console.log(msg.content.toString())
    
                console.log(`The outgoing transaction count is ${nonce}`)

                // build the transaction
                let txObject = {
                    to: transaction.to,
                    // value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
                    value: transaction.value,
                    gas: 30000, // standard: 21000
                    gasPrice: gasPrices.high * 1000000000,
                    nonce: nonce++,
                    data: transaction.data,
                    chainId: 3 // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
                }
            
                console.log('Transaction:\n', txObject)
            
                var tx = new EthereumTx(txObject, {'chain': 'ropsten'})
                tx.sign(Buffer.from(WALLET_PRIVATE_KEY, 'hex'))
                
                var serializedTx = tx.serialize()
            
                const txId = web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                    .on('receipt', console.log)
            }, {noAck: true})
        })
    })

}

// fetch the current transaction gas prices from https://ethgasstation.info
const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
        low: response.data.safeLow/10,
        medium: response.data.average/10,
        high: response.data.fast/10
    }

    // console.log('Current gas prices:')
    // console.log(`Safe low: ${prices.low}`)
    // console.log(`Standard: ${prices.medium}`)
    // console.log(`Fast: ${prices.high}`)

    return prices
}

main()
