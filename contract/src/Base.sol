// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.24;

 import "src/Customer.sol";
 import "src/Owner.sol";

 contract Base {
    address private coreTeam;

    mapping(address => bool) private blacklisted;

    constructor() {
        coreTeam = msg.sender;
    }

    modifier blacklistingPass() {
        require(!blacklisted[msg.sender], "error - you are blacklisted, contact support");
        _;
    }

    function browseAVailableProperty () public view returns (OwnerProfile.propertyDetails[] memory) {
      
      }

    function buyOrRentProperty (uint _propertyID, address payable _ownerAddress, uint256 _propertyPrice) external blacklistingPass{ // @dev user must copy and paste owner address manually
        OwnerProfile.propertyDetails storage good = propertyMapping[_propertyID];
        (bool sent, ) = _ownerAddress.call{value: _propertyPrice}("");
        
      }
 }
 