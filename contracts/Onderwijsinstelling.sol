pragma solidity ^0.4.18;

contract Onderwijsinstelling {

    event Logger(address, string);
    address private instelling;
    mapping (address  => string) private studentenBadges;

    modifier isInstelling {
        require(msg.sender == instelling );
        _;
    }

    function Onderwijsinstelling() public payable {
        instelling = msg.sender;
        Logger(instelling, "Deze eigenaar heeft het contract aangemaakt.");
    }

    function toekennenBadge(address student, string hash) public isInstelling {
        studentenBadges[student] = hash;
    }

    function verifeerBadge(address student, string hash) public constant returns (bool) {
        return keccak256(studentenBadges[student]) == keccak256(hash);
    }
}