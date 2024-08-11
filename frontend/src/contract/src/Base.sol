// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.24;

 contract Base {

    address private coreTeam;
    address[] public propertyOwner;
    uint[] propertyID;

    struct ownerDetails{
        address ownerAddress;
        string nullifier_hash;
    }    bool public createdProfile;


    mapping(address => ownerDetails) public ownerMapping; 
    uint public propertyTracking;
    
    modifier onlyOwner() {
        bool confirmedOwner = false;
          for(uint j = 0; j < propertyOwner.length; j++) {
            if(propertyOwner[j] == msg.sender) {
                confirmedOwner = true;
            }
          }

          require(confirmedOwner, "error - only property owners can take this action");
        _;
    }

    event NewOwner(string name, address indexed ownerAddress, uint id);
    event NewListing(uint propertyID);
    event PaidRent(uint indexed propertyID, uint propertyPrice, address indexed ownerAddress, address indexed sender);

    
    constructor() payable {
        coreTeam = msg.sender;
    }
    
    function payRent (uint _propertyID, address payable _ownerAddress, uint256 _propertyPrice, string memory nullifier_hash) external payable{  // @dev user must copy and paste owner address manually
        
        (bool sent, ) = _ownerAddress.call{value: _propertyPrice}("");
        require(sent, "Error - unable to pay rent");
        
      emit PaidRent(_propertyID, _propertyPrice, _ownerAddress, msg.sender);
      
    }
    function listProperty(uint _propertyID) external onlyOwner {
       propertyTracking++; //@dev for the incrementation to be in place

       emit NewListing(_propertyID);
    }

 }
 
