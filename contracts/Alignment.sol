pragma solidity ^0.4.18;

contract Alignment {
    bytes32 private targetName;
    bytes32 private targetUrl;
    bytes32 private targetFramework;
    bytes32 private targetCode;

    function Alignment(bytes32 name, bytes32 url, bytes32 framework, bytes32 code) public {
        targetName = name;
        targetUrl = url;
        targetFramework = framework;
        targetCode = code;
    }

    function getTargetName() public view returns (bytes32) {
        return targetName;
    }

    function getTargetUrl() public view returns (bytes32) {
        return targetUrl;
    }

    function getTargetFramework() public view returns (bytes32) {
        return targetFramework;
    }

    function getTargetCode() public view returns (bytes32) {
        return targetCode;
    }
}