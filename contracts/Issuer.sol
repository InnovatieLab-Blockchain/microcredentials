pragma solidity ^0.4.18;

import "./Profile.sol";

contract Issuer is Profile {

    function Issuer(string id, bytes32[2] typeOB, string name) Profile(id, typeOB, name) public {

    }
}
