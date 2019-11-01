pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./IAssetsRegistriesRegistry.sol";

/// @title Assets Registries Registry
/// @notice Smart contract to register addresses of assets' registries
/// where each asset is represented by an unique uint256 id.
/// The main registries of these type are those of NFTs smart contracts,
/// registrying NFT id -> address ownerships amongst others
contract AssetsRegistriesRegistry is IAssetsRegistriesRegistry, Ownable {
    mapping(bytes32 => address) private assetsRegistries;

    event AssetsRegistryUpdated(bytes32 indexed hashedAssetRegistryId, address updatedAddress);

    function getAssetsRegistryAddress(bytes32 _hashedAssetRegistryId) external view returns (address) {
        return assetsRegistries[_hashedAssetRegistryId];
    }

    function setAssetsRegistryAddress(bytes32 _hashedAssetRegistryId, address _assetRegistryAddress) external returns (bool) {
        assetsRegistries[_hashedAssetRegistryId] = _assetRegistryAddress;
        emit AssetsRegistryUpdated(_hashedAssetRegistryId, _assetRegistryAddress);
        return true;
    }
}