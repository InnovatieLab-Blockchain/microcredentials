var web3Provider;

if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
} else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(web3Provider);

var abi = JSON.parse("[{\"constant\":false,\"inputs\":[{\"name\":\"issuer\",\"type\":\"address\"},{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"badgeClass\",\"type\":\"address\"},{\"name\":\"hash\",\"type\":\"uint256\"}],\"name\":\"assertBadge\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"number\",\"type\":\"uint256\"},{\"name\":\"hash\",\"type\":\"uint256\"}],\"name\":\"validateAssertion\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"number\",\"type\":\"uint256\"}],\"name\":\"getAssertion\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]");
var contractAddress = "0x75c35c980c0d37ef46df04d31a140b65503c0eed";
var contract = web3.eth.contract(abi).at(contractAddress);
var issuer = "0x9fbda871d559710256a2502a2517b794b482db40";
var badgeClass = "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4";
var badgeHash = 42;

function assertBadge() {
    var studentAddresses = document.getElementById("students");
    var recipient = studentAddresses.options[studentAddresses.selectedIndex].value;
    var url = "atheneum.png";

    contract.assertBadge.sendTransaction(issuer, recipient, badgeClass, badgeHash, {
        from: web3.eth.accounts[0],
        gas:4000000},
        function(error, result) {
            if(!error) {
                console.log(result);
                // storeBadge(url); //Tijdelijk uitgezet ivm MT

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
    var studentAddresses = document.getElementById("students");
    var recipient = studentAddresses.options[studentAddresses.selectedIndex].value;
    var number = 1;

    contract.validateAssertion.call(recipient, number, badgeHash, {
        from: web3.eth.accounts[0],
        gas:400000},
        function(error, result) {
            if(!error) {
                console.log(result);
                // retrieveBadge("QmYmHV9cGVRkh78TBKgvCBkDdP9B5cdBybDs7evbfFHCvN"); //Tijdelijk uitgezet ivm MT

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

function storeBadge(url) {
    window.ipfs = window.IpfsApi('localhost', '5001', {protocol: 'http'});

    const Buffer = window.IpfsApi().Buffer;
    var buffer = Buffer.from(url);

    window.ipfs.add([buffer], function(error, result) {
         if(!error) {
             console.log('IPFS-hash: ' + result[0].hash);
         } else {
             console.error(error);
         }
     });
}

function retrieveBadge(location) {
    window.ipfs = window.IpfsApi('localhost', '5001', {protocol: 'http'});
    
    window.ipfs.get(location, function(error, result) {
         if(!error) {
             console.log('Result: ' + result[0].content);
         } else {
             console.error(error);
         }
    });
}














