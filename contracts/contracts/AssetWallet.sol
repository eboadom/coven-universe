pragma solidity ^0.5.4;

import "./IOwnedAsset.sol";
import "./AssetWalletFactory.sol";
import "./ERC721/ERC721Receivable.sol";

contract AssetWallet is ERC721Receivable {

    uint256 public assetOwned;
    AssetWalletFactory public assetWalletFactory;

    event GenericCallSuccess(bytes indexed result, bool success);

    event ReceivedEth(
        address sender,
        uint256 amount
    );

    modifier onlyAssetOwner {
        require(IOwnedAsset(assetWalletFactory.getAssetsRegistry()).ownerOf(assetOwned) == msg.sender, "Invalid asset owner");
        _;
    }

    constructor(AssetWalletFactory _assetWalletFactory, uint256 _assetId) public {
        assetWalletFactory = _assetWalletFactory;
        assetOwned = _assetId;
    }

    /// @notice Fallback function, to allow receiving ETH
    function() external payable {
        if (msg.value > 0) {
            emit ReceivedEth(msg.sender, msg.value);
        }
    }

    /// @notice Generic function to forward calls to other contracts and/or transfer ETH
    ///  - Callable only by the current owner of the asset
    /// @param _to The recipient of the transaction to forward or ETH
    /// @param _gas Limit amount of gas used on the internal transaction
    /// @param _value The wei amount to transfer in the internal transaction
    /// @param _encodedFunction The abi encoded call to do the internal tx or "0x0" in order
    ///  to transfer ETH to an user wallet
    ///  Example (web3.js): testContractInstance.contract.methods.randomFunction().encodeABI()
    function genericCall(
        address _to,
        uint256 _gas,
        uint256 _value,
        bytes calldata _encodedFunction)
    external onlyAssetOwner returns(bool)
    {
        (bool _success, bytes memory _resultTx) = _to.call.gas(_gas).value(_value)(_encodedFunction);
        require(_success,"INTERNAL_TX_REVERTED");
        emit GenericCallSuccess(_resultTx, _success);
        return _success;
    }

}