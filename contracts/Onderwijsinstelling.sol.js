pragma;
solidity ^ 0.4;
.18;
contract;
Onderwijsinstelling;
{
    event;
    Logger(address, string);
    address;
    instelling;
    mapping(function (address) { return string; });
    studentenBadges;
    modifier;
    isInstelling;
    {
        require(msg.sender == instelling);
        _;
    }
    function Onderwijsinstelling() { }
    payable;
    {
        instelling = msg.sender;
        Logger(instelling, "Deze eigenaar heeft het contract aangemaakt.");
    }
    function toekennenBadge(address, string) {
        if (address === void 0) { address = student; }
        if (string === void 0) { string = hash; }
    }
    isInstelling;
    {
        studentenBadges[student] = hash;
    }
    function verifeerBadge(address, string) {
        if (address === void 0) { address = student; }
        if (string === void 0) { string = hash; }
    }
    constant;
    returns(bool);
    {
        return keccak256(studentenBadges[student]) == keccak256(hash);
    }
}
