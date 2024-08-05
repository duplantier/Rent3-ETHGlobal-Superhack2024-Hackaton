pragma solidity 0.8.24;

 contract OwnerProfile {

    address[] public propertyOwner;

    struct ownerDetails{
        string name;
        address ownerAddress;
        uint256 ownerId;
        bool verified; 
    }

    struct propertyDetails{
         string propertyID;
         uint price;
         string name;
         string description;
    }

    mapping (uint => propertyDetails) public propertyMapping;


    function createOwnerProfile() external {}
    function listProperty() external {}
    function delistProperty() external {}
    function changeOwner() external {}
    function removeProfile() external {} 
 }