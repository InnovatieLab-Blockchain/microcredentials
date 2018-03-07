var alignment = artifacts.require("./Alignment.sol");
var assertion = artifacts.require("./Assertion.sol");
var badgeClass = artifacts.require("./BadgeClass.sol");
var badgeTemplate = artifacts.require("./BadgeTemplate.sol");
var issuer = artifacts.require("./Issuer.sol");
var recipient = artifacts.require("./Recipient.sol");
var openBadges = artifacts.require("./OpenBadges.sol");
var profile = artifacts.require("./Profile.sol");

module.exports = function (deployer) {

    deployer.deploy(alignment, 'naam', 'url', 'framework', 'code');
    deployer.deploy(profile, "id", 'ob', "naam");
    deployer.deploy(badgeTemplate, [alignment.address], "id", 'ob', "naam");
    deployer.deploy(issuer, "issuer001", 'ob', "Hanzehogeschool");
    deployer.deploy(badgeClass, issuer.address, [alignment.address], "badge001", 'ob', "HAVO Diploma");
    deployer.deploy(recipient, "recipient001", 'ob', "Jan de Vries");
    deployer.deploy(recipient, "recipient002", 'ob', "Marieke Veenstra");
    deployer.deploy(recipient, "recipient003", 'ob', "Hassan Yilmaz");
    deployer.deploy(assertion, issuer.address, recipient.address, badgeClass.address, 42);
    deployer.deploy(openBadges);

};
