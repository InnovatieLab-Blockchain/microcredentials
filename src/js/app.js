App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        return App.initWeb3();
    },
    initWeb3: function() {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
    },
    assignBadgeToStudent: function() {
        alert('mekker');
        var abi = "[{\"constant\":true,\"inputs\":[{\"name\":\"student\",\"type\":\"address\"},{\"name\":\"hash\",\"type\":\"string\"}],\"name\":\"verifyBadge\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"\",\"type\":\"string\"}],\"name\":\"Logger\",\"type\":\"event\"},{\"constant\":false,\"inputs\":[{\"name\":\"student\",\"type\":\"address\"},{\"name\":\"hash\",\"type\":\"string\"}],\"name\":\"assignBadge\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"constructor\"}]";
        var contractAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
        var contract = web3.eth.contract(abi).at(contractAddress);

        console.log('Calling smart contract assignBadge.');

        var studentAddress = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        var badgeHash = "264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb";

        contract.assignBadge.sendTransaction(studentAddress, badgeHash, {
            from: web3.eth.accounts[0],
            gas:4000000},
            function(error, result) {
                if(!error) {
                    console.log(result);
                } else {
                    console.error(error);
                }
        });
    }
};

$(function() {
   $(window).load(function() {
        App.init();
   });
});
