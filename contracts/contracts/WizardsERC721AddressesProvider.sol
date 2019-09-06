pragma solidity ^0.5.4;

contract WizardsERC721AddressesProvider {
    address public wizardsERC721Address;

    constructor(address _wizardsERC721ContractAddress) public {
        wizardsERC721Address = _wizardsERC721ContractAddress;
    }

    function setWizardsERC721Address(address _wizardsERC721ContractAddress) external  {
        wizardsERC721Address = _wizardsERC721ContractAddress;
    }
}