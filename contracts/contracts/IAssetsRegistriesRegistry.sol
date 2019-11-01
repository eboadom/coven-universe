pragma solidity ^0.5.4;

interface IAssetsRegistriesRegistry {
    function getAssetsRegistryAddress(bytes32 _hashedAssetRegistryId) external view returns (address);
    function setAssetsRegistryAddress(bytes32 _hashedAssetRegistryId, address _assetRegistryAddress) external returns (bool);
}