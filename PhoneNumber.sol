// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PhoneNumber {
    string private phoneNumber;

    constructor(string memory _phoneNumber) {
        console.log("Deploying PhoneNumber with number:", _phoneNumber);
        phoneNumber = _phoneNumber;
    }

    function getPhoneNumber() public view returns (string memory) {
        return phoneNumber;
    }

    function setPhoneNumber(string memory _phoneNumber) public {
        console.log("Changing phone number from '%s' to '%s'", phoneNumber, _phoneNumber);
        phoneNumber = _phoneNumber;
}

}