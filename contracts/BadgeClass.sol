pragma solidity ^0.4.18;

import "./BadgeTemplate.sol";
import "./Issuer.sol";

contract BadgeClass is BadgeTemplate {
    Issuer public issuer;

    function BadgeClass(address issuerAddress, address[] alignments, string id, bytes32[2] typeOB, string name)
                BadgeTemplate(alignments, id, typeOB, name) public {
        issuer = Issuer(issuerAddress);
    }
}