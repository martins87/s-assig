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
            console.log('Account address from MetaMask: ' + accountAddress)

            let acc = accountAddress + ''
            acc = acc.substring(2, acc.length)

            // get account balance in Ether
            web3.eth.getBalance(acc, function(error, res) {
                if(error) {
                    console.log(error)
                } else {
                    balance = res
                    console.log('Balance: ' + web3.fromWei(balance, 'ether').toFixed(4) + ' Ξ')
                }
            })
        }
    })
})

function getTransaction() {
    var address = $('#_accountAddress').val()
    var amount = $('#_amount').val()
    var transactionFee = $('#_transactionFee').val()
    var optionalData = $('#_optionalData').val()

    alert('Account address: ' + address)
}