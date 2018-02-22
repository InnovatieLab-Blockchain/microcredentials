web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
abi = JSON.parse() // todo: add method to get contract abi
IssuerContract = web3.eth.contract(abi);

accountOwnerAddress = 'Accountaddress';

contractAddress = 'smartcontract address';
contractInstance = IssuerContract.at('smartcontract address'); // todo: add method to get address from...

studentAddress = 'student'; // todo: get student address from ...
badgeHash = hash; // todo: get hash of badge
contractInstance.assignBadge.getData(studentAddress, badgeHash);

function assignBadge() {
    web3.eth.send({to:contractAddress, from:accountOwnerAddress, data: getData})
}
