pragma solidity ^0.4.18;

contract Profile {
    address public owner;
    string public id;
    bytes32[2] public typeOB;
    bytes32 public context;
    string public name;

    function Profile(string ID, bytes32[2] obType, string profileName) public {
        owner = msg.sender;
        id = ID;
        typeOB = obType;
        context = "https://w3id.org/openbadges/v2";
        name = profileName;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getId() public view returns (string) {
        return id;
    }

}