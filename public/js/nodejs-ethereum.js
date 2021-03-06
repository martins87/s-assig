	// https://github.com/davekiss/web3-node-tutorial
// https://github.com/ethereumjs/ethereumjs-tx/tree/f4cd11fa738d469420d4a6d3df575048ef5e7a4f
// Infura Make Requests
//  https://infura.io/docs/gettingStarted/makeRequests.md

require('dotenv').config()
const Web3 = require('web3')
const axios = require('axios')
// https://www.npmjs.com/package/ethereumjs-tx
const EthereumTx = require('ethereumjs-tx').Transaction

const ropsten = 'https://ropsten.infura.io/v3/de4a2c55653244c58c7af6e9c04089b5'
const web3 = new Web3(new Web3.providers.HttpProvider(ropsten))
web3.eth.defaultAccount = process.env.WALLET_ADDRESS

const amountToSend = 0.0

/**
 * My first Ethereum transaction sent from a Node.js program:
 * https://ropsten.etherscan.io/tx/0x8cea587b93e32ed65367777108693d0ef8dc698daab3219d196a3de4a1cf61ec
 */
const main = async () => {
    // get the balance in Ether
    let myBalanceInWei = await web3.eth.getBalance(web3.eth.defaultAccount)
    let myBalance = web3.utils.fromWei(myBalanceInWei, 'ether')

    console.log(`My balance: ${myBalance}`)

    // get the nonce
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount)
    console.log(`The outgoing transaction count is ${nonce}`)

    let gasPrices = await getCurrentGasPrices()

    let amountToSendWei = web3.utils.toWei(amountToSend.toString(), 'ether')
    console.log(`amountToSendWei: ${amountToSendWei}`)

    // build the transaction
    let txObject = {
        to: process.env.DESTINATION_WALLET_ADDRESS,
        value: web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), 'ether')),
        gas: 30000, // standard: 21000
        gasPrice: gasPrices.high * 1000000000,
        nonce: nonce,
        data: web3.utils.toHex('Daniel'),
        chainId: 3 // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
    }

    console.log('Transaction:\n', txObject)

    var tx = new EthereumTx(txObject, {'chain': 'ropsten'})
    tx.sign(Buffer.from(process.env.WALLET_PRIVATE_KEY, 'hex'))
    
    var serializedTx = tx.serialize()

    const txId = web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log)

    // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    //     .on('receipt', (txId) => {
    //         var obj = web3.eth.getTransaction(txId)
    //         console.log('obj:\n', + obj)
    //     })

    // send the transaction
    // const txId = web3.eth.sendTransaction(tx)

    // const txUrl = `https://ropsten.etherscan.io/tx/${txId}`
    // console.log('tx url: ' + txUrl)
}

// fetch the current transaction gas prices from https://ethgasstation.info
const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
        low: response.data.safeLow/10,
        medium: response.data.average/10,
        high: response.data.fast/10
    }

    console.log('Current gas prices:')
    console.log(`Safe low: ${prices.low}`)
    console.log(`Standard: ${prices.medium}`)
    console.log(`Fast: ${prices.high}`)

    return prices
}

main()
