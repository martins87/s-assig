
# Salamantex Assignment - Transactions Processor

![Submit transaction](https://i.imgur.com/szSgGtq.png)

---

![Transactions processor](https://i.imgur.com/u24sax0.png)

## 1. Description

The application is a simple transactions processor that allows a user to submit a transaction on the 'Submit Transaction' page. The transaction submitted is sent to a queue and it is processed by the parallel process running in parallel. The log of the transaction mined is shown on the processor terminal (as shown on the second image above).

## 2. Project decisions

* Database used: MongoDB
* Technology used: Node.js
* Protocol for message queueing: AMQP
* Database simple operations: create user, list users, see a specific user
* For the application to be easy to test, both database and message queueing processor are on the cloud: https://mlab.com/ and https://www.cloudamqp.com/
* Only Ethereum transactions were implemented
* The Ethereum Ropsten Test Network was chosed
* An account on the Ropsten Network was created for the application. The processor signs and sends transactions from this account
* No validations are made for the moment (Wait for it...)

## 3. The Transactions Processor

The processor is a program that must run in parallel. It listens for messages sent to the queue, get them and process them.
When a transaction is received by the processor, it builds an Ethereum transaction with the data received and broadcasts it to the network.

Node.js packages used :
* amqp - for message queueing
* web3 - for making the connection to an Ethereum node
* axios - for fetching ether gas prices from https://ethgasstation.info/json/ethgasAPI.json
* ethereumjs-tx - for creating the transactions

## 4. Getting Started

### Prerequisites

* Have Node.js installed

### Installing

Clone the repository:
```
git clone https://github.com/martins87/s-assig.git
```

## 5. Running the tests

Open terminal 1:

```
git clone https://github.com/martins87/s-assig.git
cd s-assig
npm install
npm start
```

Open terminal 2:

```
node public/js/processor.js
```

Open your browser and go to http://localhost:3000/

**Note:**
*At the moment, transactions are only working when you send 0 Ether and put some text on the field "Optional Data", like ''Salamantex", so please try it out.*

To see the transactions on the explorer, go to [https://ropsten.etherscan.io/address/0x220339f638a2ce9a1a7143f2ee7d19999cba13b8](https://ropsten.etherscan.io/address/0x220339f638a2ce9a1a7143f2ee7d19999cba13b8)

## 6. Built With

* [Bootstrap](https://getbootstrap.com/)
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)

## 7. Author

* **Daniel Martins** - [Operation Blockchain](https://www.operationblockchain.org/)
