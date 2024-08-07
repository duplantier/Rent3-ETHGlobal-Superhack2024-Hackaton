// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.24;

 import "src/Customer.sol";
 import "src/Owner.sol";

 contract Base {
    address private coreTeam;

    constructor() {
        coreTeam = msg.sender;
    }

    function browseAVailableProperty () public view returns (OwnerProfile.propertyDetails[] memory) {
      
      }

    function buyOrRentProperty (uint _propertyID, address payable _ownerAddress, uint256 _propertyPrice) external blacklistingPass{ // @dev user must copy and paste owner address manually
        OwnerProfile.propertyDetails storage good = propertyMapping[_propertyID];
        (bool sent, ) = _ownerAddress.call{value: _propertyPrice}("");
        
      }
 }
 