pragma solidity ^0.4.18;

import "./Profile.sol";

contract Recipient is Profile {

    function Recipient(string id, bytes32[2] typeOB, string name) Profile(id, typeOB, name) public {

    }
}
