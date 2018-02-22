var issuer = artifacts.require("./Issuer.sol");

module.exports = function(deployer) {
  deployer.deploy(issuer);
};
