// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.24;

 import "src/Customer.sol";
 import "src/Owner.sol";

 contract Base{
    address private coreTeam;

    function browseAVailableProperty () external {}
    function buyOrRentProperty () external {}

    function blacklistOwner() external {}
    function blacklistUser() external {}
    function pauseForEmergency() external {}
 }
 