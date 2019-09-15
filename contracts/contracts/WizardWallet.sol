pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "@daostack/infra/contracts/votingMachines/IntVoteInterface.sol";
import "./WizardWalletFactory.sol";
import "./IERC721.sol";

contract WizardWallet {
    using SafeERC20 for ERC20;

    uint256 wizardId;

    WizardWalletFactory wizardWalletFactory;

    modifier onlyWizardOwner {
        address _wizardsERC721Address = wizardWalletFactory.wizardsERC721AddressesProvider().wizardsERC721Address();
        require(IERC721(_wizardsERC721Address).ownerOf(wizardId) == msg.sender, "Invalid wizard owner");
        _;
    }

    constructor(WizardWalletFactory _wizardWalletFactory, uint256 _wizardId) public {
        wizardWalletFactory = _wizardWalletFactory;
        wizardId = _wizardId;
    }

    function voteProposal(address _votingMachine, bytes32 _proposalId, uint256 _vote, uint256 _reputationToUse)
        external onlyWizardOwner {
        IntVoteInterface(_votingMachine).vote(_proposalId, _vote, _reputationToUse, address(this));
    }

    function() external payable {}

    function withdrawEthFunds() external onlyWizardOwner {
        msg.sender.transfer(address(this).balance);
    }

    function transferERC20(address _erc20Address, address payable _recipient, uint256 _amount) external onlyWizardOwner {
        ERC20(_erc20Address).safeTransfer(_recipient, _amount);
    }

    function transfer(address _erc20Address, address payable _recipient, uint256 _amount) external onlyWizardOwner {
        _recipient.transfer(_amount);
    }

    // TODO: add tranferFrom from owner
    // TODO: add approve erc20
}