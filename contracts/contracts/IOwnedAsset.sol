pragma solidity ^0.5.4;

/**
 * @title Basic ownership interface, compatible with ERC721 Non-Fungible Token Standard
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
interface IOwnedAsset {
    function ownerOf(uint256 assetId) external view returns (address owner);
}