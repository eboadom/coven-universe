pragma solidity ^0.5.4;

import "./IOwnedAsset.sol";
import "./AssetWalletFactory.sol";
import "./ERC721/ERC721Receivable.sol";

contract AssetWallet is ERC721Receivable {

    uint256 public assetOwned;
    AssetWalletFactory public assetWalletFactory;

    /// @notice Emitted whenever a transaction is processed successfully from this wallet. Includes
    /// both simple send ether transactions, as well as other smart contract invocations.
    /// Inspired by InvocationSuccess event on https://github.com/dapperlabs/dapper-contracts/blob/master/contracts/Wallet/CoreWallet.sol
    /// @param result A bitfield of the results of the operations. A bit of 0 means success, and 1 means failure.
    /// @param numOperations A count of the number of operations processed
    event GenericCallSuccess(
        uint256 result,
        uint256 numOperations
    );

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

    /// @notice Fallback function, only allowing receiving ETH
    function() external payable {
        if (msg.value > 0) {
            emit ReceivedEth(msg.sender, msg.value);
        }
    }

    /// @notice Wrapper external function to execute a generic call to any function on any other smart contract
    /// It only calls the internal _genericCall, which executes assembly instructions and needs to be internal
    /// Inspired by invoke0() of https://github.com/dapperlabs/dapper-contracts/blob/master/contracts/Wallet/CoreWallet.sol
    /// @param data The data containing the transactions to be invoked; see internalInvoke for details.
    function genericCall(bytes calldata data) external {
        _genericCall(data);
    }

    /// @notice Internal function to execute a generic call to any function on any other smart contract
    /// Inspired by internalInvoke() of https://github.com/dapperlabs/dapper-contracts/blob/master/contracts/Wallet/CoreWallet.sol
    /// @param data The data to send to the `call()` operation
    ///  The data is prefixed with a global 1 byte revert flag
    ///  If revert is 1, then any revert from a `call()` operation is rethrown.
    ///  Otherwise, the error is recorded in the `result` field of the `GenericCallSuccess` event.
    ///  Immediately following the revert byte (no padding), the data format is then is a series
    ///  of 1 or more tightly packed tuples:
    ///  `<target(20),amount(32),datalength(32),data>`
    ///  If `datalength == 0`, the data field must be omitted
    function _genericCall(bytes memory data) internal {
        // keep track of the number of operations processed
        uint256 numOps;
        // keep track of the result of each operation as a bit
        uint256 result;

        // We need to store a reference to this string as a variable so we can use it as an argument to
        // the revert call from assembly.
        string memory invalidLengthMessage = "Data field too short";
        string memory callFailed = "Call failed";

        // At an absolute minimum, the data field must be at least 85 bytes
        // <revert(1), to_address(20), value(32), data_length(32)>
        require(data.length >= 85, invalidLengthMessage);

        // Forward the call onto its actual target. Note that the target address can be `self` here, which is
        // actually the required flow for modifying the configuration of the authorized keys and recovery address.
        //
        // The assembly code below loads data directly from memory, so the enclosing function must be marked `internal`
        assembly {
            // A cursor pointing to the revert flag, starts after the length field of the data object
            let memPtr := add(data, 32)

            // The revert flag is the leftmost byte from memPtr
            let revertFlag := byte(0, mload(memPtr))

            // A pointer to the end of the data object
            let endPtr := add(memPtr, mload(data))

            // Now, memPtr is a cursor pointing to the beginning of the current sub-operation
            memPtr := add(memPtr, 1)

            // Loop through data, parsing out the various sub-operations
            for { } lt(memPtr, endPtr) { } {
                // Load the length of the call data of the current operation
                // 52 = to(20) + value(32)
                let len := mload(add(memPtr, 52))
                
                // Compute a pointer to the end of the current operation
                // 84 = to(20) + value(32) + size(32)
                let opEnd := add(len, add(memPtr, 84))

                // Bail if the current operation's data overruns the end of the enclosing data buffer
                // NOTE: Comment out this bit of code and uncomment the next section if you want
                // the solidity-coverage tool to work.
                // See https://github.com/sc-forks/solidity-coverage/issues/287
                if gt(opEnd, endPtr) {
                    // The computed end of this operation goes past the end of the data buffer. Not good!
                    revert(add(invalidLengthMessage, 32), mload(invalidLengthMessage))
                }
                // NOTE: Code that is compatible with solidity-coverage
                // switch gt(opEnd, endPtr)
                // case 1 {
                //     revert(add(invalidLengthMessage, 32), mload(invalidLengthMessage))
                // }

                // This line of code packs in a lot of functionality!
                //  - load the target address from memPtr, the address is only 20-bytes but mload always grabs 32-bytes,
                //    so we have to shr by 12 bytes.
                //  - load the value field, stored at memPtr+20
                //  - pass a pointer to the call data, stored at memPtr+84
                //  - use the previously loaded len field as the size of the call data
                //  - make the call (passing all remaining gas to the child call)
                //  - check the result (0 == reverted)
                if eq(0, call(gas, shr(96, mload(memPtr)), mload(add(memPtr, 20)), add(memPtr, 84), len, 0, 0)) {
                    switch revertFlag
                    case 1 {
                        revert(add(callFailed, 32), mload(callFailed))
                    }
                    default {
                        // mark this operation as failed
                        // create the appropriate bit, 'or' with previous
                        result := or(result, exp(2, numOps))
                    }
                }

                // increment our counter
                numOps := add(numOps, 1)
             
                // Update mem pointer to point to the next sub-operation
                memPtr := opEnd
            }
        }

        // emit single event upon success
        emit GenericCallSuccess(result, numOps);
    }

    // function voteProposal(address _votingMachine, bytes32 _proposalId, uint256 _vote, uint256 _reputationToUse)
    //     external onlyWizardOwner {
    //     IntVoteInterface(_votingMachine).vote(_proposalId, _vote, _reputationToUse, address(this));
    // }
}