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

    uint public propertyTracking; // @devs marks count
    bool public createdProfile;

    mapping (uint256 => propertyDetails) public propertyMapping; // tracking the property struct
    mapping(address => ownerDetails) public ownerMapping; 
    
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
    event NewListing(string name, string description, uint price, uint id);
    event removedListing(uint indexed id);

    function createOwnerProfile( string memory _name, uint _ownerID, address _ownerAddress) external onlyOwner(){
       require(!createdProfile, "you can't create more than one profile");
       ownerMapping[msg.sender] = ownerDetails({
        name : _name,
        ownerId : _ownerID,
        ownerAddress : _ownerAddress
       });
       
       createdProfile = true;

       emit NewOwner(_name, _ownerAddress, _ownerID);

    }
    function listProperty(string memory _name, string memory _description, uint256 _price, uint256 _propertyID) external onlyOwner {
       propertyMapping[propertyTracking] = propertyDetails(_name, _description, _price, _propertyID);
       propertyTracking++; //@dev for the incrementation to be in place
       
       emit NewListing(_name, _description, _price, _propertyID);
    }

    function fetchAllListedProperty() public view returns (propertyDetails[] memory) {
        uint256 numberOfHouses = 0;
        for (uint256 j= 0; j < propertyTracking; j++) {
            numberOfHouses++;

            propertyDetails[] memory allAvailableHouses = new propertyDetails[](propertyTracking);
            uint256 id = 0;

            for(uint256 i = 0; i < propertyTracking; i++) {
                allAvailableHouses[id++] = propertyMapping[i];
            }

            return allAvailableHouses;
        }

    }
    function delistProperty(uint _IDOfPropertyToBeRemoved) external {
        delete propertyMapping[_IDOfPropertyToBeRemoved];
        emit removedListing(_IDOfPropertyToBeRemoved);
    }

 }
