pragma solidity ^0.4.18;

import "./Recipient.sol";
import "./Assertion.sol";

contract OpenBadges {

    mapping (address => mapping (uint => Assertion)) private assertions;
    mapping (address => uint) private lastAssertions;

    function assertBadge(address issuer, address recipient, address badgeClass, uint hash) public returns (uint) {
        lastAssertions[recipient] += 1;
        uint lastAssertionNumber = lastAssertions[recipient];

        assertions[recipient][lastAssertionNumber] = new Assertion(issuer, recipient, badgeClass, hash);

        return lastAssertionNumber;
    }

    function getAssertion(address recipient, uint number) public view returns (Assertion) {
        return assertions[recipient][number];
    }

    function validateAssertion(address recipient, uint number, uint hash) public view returns (bool) {
        Assertion assertion = assertions[recipient][number];

        if(assertion == Assertion(0)) {
            return false;
        }
        return assertion.getBadgeHash() == hash;
    }



}