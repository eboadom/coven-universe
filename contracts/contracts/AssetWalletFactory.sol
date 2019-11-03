pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./IAssetsRegistriesRegistry.sol";
import "./AssetWallet.sol";


/// @title Asset Wallet Factory
/// @notice Smart Contract to create and register wallets for a particular
/// asset type. The type of the asset is referenced in the assetsRegistryId
/// variable, which is the key referencing the address of the assets registry
/// in the assetsRegistriesRegistry smart contract
contract AssetWalletFactory is Ownable {

    /// @notice The registry of asset registries smart contract. Using the
    /// interface as type in order to abstract the storage layer on its
    /// implementation
    IAssetsRegistriesRegistry public assetsRegistriesRegistry;

    /// @notice Keccak-256 Hash of the assets' registry id, used as key
    /// to store the address of the corresponding assets' registry in the
    /// assetsRegistriesRegistry smart contract
    bytes32 public assetsRegistryIdHash;

    mapping (uint256 => AssetWallet) public assetsWallets;

    event AssetWalletCreated(uint256 indexed id, address indexed wallet);

    /// @notice Simple initialization of the assetsRegistriesRegistry and assetsRegistryIdHash
    /// @param _assetsRegistriesRegistry the address of the smart contract implementing the
    /// IAssetsRegistriesRegistry interface
    /// @param _assetsRegistryIdHash the hashed identifier of the particular assets registry of this
    /// factory
    constructor(address _assetsRegistriesRegistry, bytes32 _assetsRegistryIdHash) public {
        assetsRegistriesRegistry = IAssetsRegistriesRegistry(_assetsRegistriesRegistry);
        assetsRegistryIdHash = _assetsRegistryIdHash;
    }

    function getAssetsRegistry() public view returns(address) {
        return assetsRegistriesRegistry.getAssetsRegistryAddress(assetsRegistryIdHash);
    }

    /// @notice Instantiates a new AssetWallet for an _assetId. This function can be called
    /// by anybody, as the ownership of the AssetWallet created is always linked to the current
    /// owner of the asset with _assetId id
    /// @param _assetId The id of the asset associated with the AssetWallet to be created
    function createWallet(uint256 _assetId) public returns(bool) {
        require(address(assetsWallets[_assetId]) == address(0), "The asset already has a wallet");
        assetsWallets[_assetId] = new AssetWallet(this, _assetId);
        emit AssetWalletCreated(_assetId, address(assetsWallets[_assetId]));
        return true;
    }
}