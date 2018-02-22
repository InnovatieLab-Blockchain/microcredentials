var onderwijsinstelling = artifacts.require("./Onderwijsinstelling.sol");

module.exports = function(deployer) {
  deployer.deploy(onderwijsinstelling);
};
