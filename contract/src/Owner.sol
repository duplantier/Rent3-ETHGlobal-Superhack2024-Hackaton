pragma solidity 0.8.24;

 contract OwnerProfile {

    address[] public propertyOwner;

    struct ownerDetails{
        string name;
        address ownerAddress;
        uint256 ownerId;
    }

    struct propertyDetails{
        string name;
        string description;
        uint256 price;
        uint256 propertyID;
    }

    uint private propertyTracking // @devs marks count
    bool private created Profile;

    mapping (uint256 => propertyDetails) public propertyMapping; // tracking the property struct
    mapping(address => ownerDetails) public ownerMapping; 
    
    modifier onlyOwner() {
        require(msg.sender == propertyOwner, "error - only property owners can call this function");
        _;
    }

    function createOwnerProfile( string memory _name, uint _ownerID, address _ownerAddress) external onlyOwner(){
       require(!createdProfile, "you can't create more than one profile");
       ownerMapping[msg.sender] = ownerDetails(_name, _ownerID, _ownerAddress);
       createdProfile = true;

    }
    function listProperty(string memory _name, string memory _description, uint256 _price, uint256 _propertyID) external onlyOwner {
       propertyMapping[propertyTracking] = propertyDetails(_name, _description, _price, _propertyID);
       productTracking++; //@dev for the incrementation to be in place 
    }
    function delistProperty(uint _IDOfPropertyToBeRemoved) external {
        delete propertyMapping[_IDOfPropertyToBeRemoved];
    }
    function changeOwner(address _newPropertyOwner) external onlyOwner {
        owner = _newPropertyOwner;
    }
    function removeProfile() external {
        delete ownerDetails[msg.sender];
    } 
 }
