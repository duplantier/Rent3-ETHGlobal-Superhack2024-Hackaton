// SPDX-License-Identifier: UNLICENSED

 pragma solidity 0.8.24;

  contract Customer{

    struct customerProfile{
        string name;
        uint256 customerID;
        address customerAddress;
    }

    mapping(address => customerProfile) public customerMapping;
    function createCustomerProfile(string memory _name, address _customerAddress, uint256 _customerID) external {
      customerMapping[msg.sender] = customerProfile(_name, _address, _customerID);
    }
       
  }