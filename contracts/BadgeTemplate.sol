pragma solidity ^0.4.18;

import "./Profile.sol";
import "./Alignment.sol";

contract BadgeTemplate is Profile {
    address private owner;
    Alignment[] private alignments;

    function BadgeTemplate(address[] alignmentAddresses, string id, bytes32[2] typeOB, string name)
                Profile(id, typeOB, name) public {
        owner = msg.sender;
          /*
        for(uint i = 0; i < alignments.length; i++) {
            alignments[i] = Alignment(alignmentAddresses[i]);
        }   */
    }
}
