pragma solidity ^0.5.4;

import "./IERC721.sol";
import "./WizardsERC721AddressesProvider.sol";
import "./WizardWallet.sol";

contract WizardWalletFactory {
    WizardsERC721AddressesProvider public wizardsERC721AddressesProvider;

    // wizardId => address of WizardWallet
    mapping (uint256 => WizardWallet) public wizardsWallets;

    event WizardWalletCreated(uint256 indexed wizardId, address indexed wizardWallet);

    constructor(address _wizardsERC721AddressesProvider) public {
        wizardsERC721AddressesProvider = WizardsERC721AddressesProvider(_wizardsERC721AddressesProvider);
    }

    function createWallet(uint256 _wizardId) external {
        require(address(wizardsWallets[_wizardId]) == address(0), "The wizard already has a wallet");
        wizardsWallets[_wizardId] = new WizardWallet(this, _wizardId);
        emit WizardWalletCreated(_wizardId, address(wizardsWallets[_wizardId]));
    }
}