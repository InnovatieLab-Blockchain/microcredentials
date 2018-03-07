pragma solidity ^0.4.18;

import "./BadgeClass.sol";
import "./Issuer.sol";
import "./Recipient.sol";

contract Assertion {
    Issuer public issuer;
    Recipient public recipient;
    BadgeClass public badgeClass;
    uint public issuedOn;
    bytes32 public verificationType;
    uint badgeHash;

    function Assertion(address issuerAddress, address recipientAddress, address badgeClassAddress, uint hash) public {
        issuer = Issuer(issuerAddress);
        recipient = Recipient(recipientAddress);
        badgeClass = BadgeClass(badgeClassAddress);
        issuedOn = now;
        badgeHash = hash;
    }

    function getIssuer() public view returns (Issuer) {
        return issuer;
    }

    function getBadgeHash() public view returns (uint) {
        return badgeHash;
    }

}