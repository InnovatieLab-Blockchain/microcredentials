var onderwijsinstelling = artifacts.require("./Issuer.sol");

module.exports = function(deployer) {
  deployer.deploy(onderwijsinstelling);
};
