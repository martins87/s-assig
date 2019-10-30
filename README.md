# Salamantex Assignment - Transactions Processor

## Screenshots

Submit a transaction:

![Submit transaction](https://i.imgur.com/szSgGtq.png)

Parallel transactions processor:

![Transactions processor](https://i.imgur.com/u24sax0.png)

## Description

transaction information is logged on terminal 2
mongodb in the cloud
amqp in the cloud

create user
list users
see a user

transactions
	submitted to a queue using amqp (cloud)
processor
	node.js packages:
		amqp			for message queueing
		web3			for making the connection to an Ethereum node
		axios			for fetching ether gas prices from https://ethgasstation.info/json/ethgasAPI.json
		ethereumjs-tx	for creating the transactions
	ropsten test network
	an Ethereum account was created for the application, received 5 ropsten ether
add ethereum account but does nothing


## Getting Started

...

### Prerequisites

* Have Node.js installed

### Installing

Clone the repository:
```
git clone https://github.com/martins87/s-assig.git
```

## Running the tests

Open terminal 1:

```
git clone https://github.com/martins87/s-assig.git
npm install
npm start
```

Open terminal 2:

```
node public/js/processor.js
```

Open your browser and go to http://localhost:3000/

## Built With

* [Bootstrap](https://getbootstrap.com/) - The web framework used
* [Node.js](https://nodejs.org/) - Dependency Management

## Contributing

...

## Versioning

...

## Authors

* **Daniel Martins** - [Operation Blockchain](https://www.operationblockchain.org/)
