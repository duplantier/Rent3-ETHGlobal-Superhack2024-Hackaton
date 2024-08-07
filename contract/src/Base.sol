// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.24;

 import "src/Customer.sol";
 import "src/Owner.sol";

 contract Base {

    address private coreTeam;

    constructor() {
        coreTeam = msg.sender;
    }
 
    event Purchase(uint indexed propertyID, uint propertyPrice, address indexed ownerAddress, address indexed sender);
    
    function buyOrRentProperty (uint _propertyID, address payable _ownerAddress, uint256 _propertyPrice) external{ // @dev user must copy and paste owner address manually
        
        (bool sent, ) = _ownerAddress.call{value: _propertyPrice}("");
        
      emit Purchase(_propertyID, _propertyPrice, _ownerAddress, msg.sender);
      }
 }
 