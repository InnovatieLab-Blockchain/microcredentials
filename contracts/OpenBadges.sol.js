"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
pragma;
solidity ^ 0.4;
.18;
require("./Recipient.sol");
require("./Assertion.sol");
contract;
OpenBadges;
{
    mapping(function (address) { return mapping(function (uint) { return Assertion; }); });
    assertions;
    mapping(function (address) { return uint; });
    lastAssertions;
    function assertBadge(address, address, address, uint) {
        if (address === void 0) { address = issuer; }
        if (address === void 0) { address = recipient; }
        if (address === void 0) { address = badgeClass; }
        if (uint === void 0) { uint = hash; }
    }
    returns(uint);
    {
        lastAssertions[recipient] += 1;
        uint;
        lastAssertionNumber = lastAssertions[recipient];
        assertions[recipient][lastAssertionNumber] = new Assertion(issuer, recipient, badgeClass, hash);
        return lastAssertionNumber;
    }
    function getAssertion(address, uint) {
        if (address === void 0) { address = recipient; }
        if (uint === void 0) { uint = number; }
    }
    view;
    returns(Assertion);
    {
        return assertions[recipient][number];
    }
    function validateAssertion(address, uint, uint) {
        if (address === void 0) { address = recipient; }
        if (uint === void 0) { uint = number; }
        if (uint === void 0) { uint = hash; }
    }
    view;
    returns(bool);
    {
        Assertion;
        assertion = assertions[recipient][number];
        if (assertion == Assertion(0)) {
            return false;
        }
        return assertion.getBadgeHash() == hash;
    }
}
