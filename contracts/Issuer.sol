pragma solidity ^0.4.18;

contract Issuer {

    event Logger(address, string);
    address private issuer;
    mapping (address  => string) private studentBadges;

    modifier isIssuer {
        require(msg.sender == issuer);
        _;
    }

    function Issuer() public payable {
        issuer = msg.sender;
        Logger(issuer, "This owner made the contract.");
    }

    function assignBadge(address student, string hash) public isIssuer {
        studentBadges[student] = hash;
    }

    function verifyBadge(address student, string hash) public constant returns (bool) {
        return keccak256(studentBadges[student]) == keccak256(hash);
    }
}