var web3Provider;

if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
} else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(web3Provider);

function assertBadge() {
    var abi = JSON.parse("[{\"constant\":false,\"inputs\":[{\"name\":\"issuer\",\"type\":\"address\"},{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"badgeClass\",\"type\":\"address\"},{\"name\":\"hash\",\"type\":\"uint256\"}],\"name\":\"assertBadge\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"number\",\"type\":\"uint256\"},{\"name\":\"hash\",\"type\":\"uint256\"}],\"name\":\"validateAssertion\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"number\",\"type\":\"uint256\"}],\"name\":\"getAssertion\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]");
    var contractAddress = "0xf204a4ef082f5c04bb89f7d5e6568b796096735a";
    var contract = web3.eth.contract(abi).at(contractAddress);
    var studentAddresses = document.getElementById("addresses");

    var issuer = "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f";
    var recipient = studentAddresses.options[studentAddresses.selectedIndex].text;
    var badgeClass = "0x9fbda871d559710256a2502a2517b794b482db40";
    var hashes = document.getElementById("hashes");
    var badgeHash = hashes.options[hashes.selectedIndex].text;
    var url = "MijnBadge.png";

    contract.assertBadge.sendTransaction(issuer, recipient, badgeClass, badgeHash, {
        from: web3.eth.accounts[0],
        gas:4000000},
        function(error, result) {
            if(!error) {
                console.log(result);
                // storeBadge(url);

                document.getElementById("hashresult").textContent = "Het diploma is succesvol toegekend aan de student en opgeslagen op de blockchain.";
                document.getElementById("hashresult").style = "display:block; color:#008000;";
            } else {
                console.error(error);
                document.getElementById("hashresult").textContent = "Het toekennen van het diploma is mislukt.";
                document.getElementById("hashresult").style = "display:block; color:#800000;";
            }
    });
}

function validateAssertion() {
    var abi = JSON.parse("[{\"constant\":false,\"inputs\":[{\"name\":\"issuer\",\"type\":\"address\"},{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"badgeClass\",\"type\":\"address\"},{\"name\":\"hash\",\"type\":\"uint256\"}],\"name\":\"assertBadge\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"number\",\"type\":\"uint256\"},{\"name\":\"hash\",\"type\":\"uint256\"}],\"name\":\"validateAssertion\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"number\",\"type\":\"uint256\"}],\"name\":\"getAssertion\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]");
    var contractAddress = "0xf204a4ef082f5c04bb89f7d5e6568b796096735a";
    var contract = web3.eth.contract(abi).at(contractAddress);
    var studentAddresses = document.getElementById("addresses2");

    var recipient = studentAddresses.options[studentAddresses.selectedIndex].text;
    var volgnummers = document.getElementById("volgnummer");
    var number = volgnummers.options[volgnummers.selectedIndex].text;
    var hashes = document.getElementById("hashes2");
    var badgeHash = hashes.options[hashes.selectedIndex].text;

    contract.validateAssertion.call(recipient, number, badgeHash, {
        from: web3.eth.accounts[0],
        gas:400000},
        function(error, result) {
            if(!error) {
                console.log(result);
                // retrieveBadge("QmaYNppAYhBjN7gCSdbSemf7u4pLuJVEPFZSiXycfm3Pek");

                if(result) {
                    document.getElementById("validatebadge").textContent = "Diploma is valide.";
                    document.getElementById("validatebadge").style = "width:500px; display:block; color:#008000; padding: 20px;";
                } else {
                    document.getElementById("validatebadge").textContent = "Diploma is NIET valide.";
                    document.getElementById("validatebadge").style = "width:500px; display:block; color:#800000; padding: 20px;";
                }
            } else {
                console.error(error);
                document.getElementById("validatebadge").textContent = "Validatie proces mislukt!";
                document.getElementById("validatebadge").style = "width:500px; display:block; color:#800000; padding: 20px;";
            }
    });
}

function storeBadge(location) {
    window.ipfs = window.IpfsApi('localhost', '5001', {protocol: 'http'});

    const Buffer = window.IpfsApi().Buffer;
    var buffer = Buffer.from(location);

    window.ipfs.add([buffer], function(error, result) {
         if(!error) {
             console.log('Badge successfully stored in IPFS.\nIPFS-hash: ' + result[0].hash);
         } else {
             console.error(error);
         }
     });
}

function retrieveBadge(location) {
    window.ipfs = window.IpfsApi('localhost', '5001', {protocol: 'http'});

    const Buffer = window.IpfsApi().Buffer;

    window.ipfs.get(location, function(error, result) {
         if(!error) {
             console.log('Badge successfully retrieved from IPFS.\nResult: ' + result[0].content);
         } else {
             console.error(error);
         }
    });

}














