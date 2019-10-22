var accountAddress

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            web3.eth.sendTransaction({/*...*/});
        } catch (error) {
            // web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction({/*...*/}); 
    }
    else {
        // web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    // get address from MetaMask
    web3.eth.getAccounts(function(error, result) {
        if(error) {
            console.log(error)
        } else {
            accountAddress = result
            let acc = accountAddress + ''
            acc = acc.substring(2, acc.length)

            // get account balance in Ether
            web3.eth.getBalance(acc, function(error, res) {
                if(error) {
                    console.log(error)
                } else {
                    balance = res
                    console.log('Account address from MetaMask: ' + accountAddress +
                        '\nBalance: ' + web3.fromWei(balance, 'ether').toFixed(4) + ' Ξ')
                }
            })
        }
    })
})

function submitTransaction() {
    var address = $('#_accountAddress').val()
    var amount = $('#_amount').val()
    var transactionFee = $('#_transactionFee').val()
    var optionalData = $('#_optionalData').val()

    // TODO: validate the transaction
    // E.g.: user A has enough of currency type and amount, etc. ...
    let txObject = {
        from: accountAddress + '',
        to: address + '',
        value: web3.toWei(amount, 'ether'),
        data: web3.toHex(optionalData),
        gas: 30000
    }

    // set values for form fields
    $('#_from').val(txObject.from)
    $('#_to').val(txObject.to)
    $('#_value').val(txObject.value)
    $('#_hexData').val(txObject.data)
    $('#_gas').val(txObject.gas)
    // $('#_txId').val('10')

    // let DOMObject = {
    //     from: $('#_from').val(),
    //     to: $('#_to').val(),
    //     value: $('#_value').val(),
    //     data: $('#_hexData').val(),
    //     gas: $('#_gas').val()
    //     // txId: $('#_txId').val() 
    // }
    // console.log('DOMObject: ', DOMObject)

    // 0xb4711e067096B404356D93568EB8aa6b8dA528E6
    // web3.eth.sendTransaction(DOMObject, (err, txHash) => {
    //     if(err) {
    //         console.log('There was an error broadcasting the transaction')
    //         console.log(err)
    //     } else {
    //         console.log('Your transaction was broadcasted\ntxHash: ' + txHash)

    //         $('#_txId').val(txHash)
    //         console.log('Setou a tx hash!')
    //         event.preventDefault()
    //     }
    // })

    // event.preventDefault()
}