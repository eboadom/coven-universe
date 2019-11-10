pragma solidity ^0.5.4;

import "@daostack/arc/contracts/universalSchemes/DaoCreator.sol" as Factories;
import "@daostack/arc/contracts/controller/UController.sol";
import "@daostack/arc/contracts/controller/Avatar.sol";
import "@daostack/arc/contracts/universalSchemes/SchemeRegistrar.sol";
import "@daostack/infra/contracts/votingMachines/QuorumVote.sol";
import "@daostack/arc/contracts/universalSchemes/GlobalConstraintRegistrar.sol";
import "@daostack/arc/contracts/universalSchemes/UpgradeScheme.sol";
import "@daostack/arc/contracts/universalSchemes/ContributionReward.sol";

contract AtomicDaoCreator {

    Factories.DaoCreator public daoCreator;

    uint256[] foundersInitialTokens;
    uint256[] foundersInitialReputation;
    address[] founders;
    address[] schemes;
    bytes32[] schemesParams;
    bytes4[] permissions;
    string public defaultTokenSymbol= "CTKN";
    string public defaultTokenName = "CTKN";
    address public votingMachine;
    address public schemeRegistrar;
    address public globalConstraintRegistrar;
    address public upgradeScheme;
    address public contributionReward;
    address public avatar;

    constructor(address[] memory _contracts, string memory _orgName, string memory _metaData) public {
        daoCreator = Factories.DaoCreator(_contracts[0]);
        votingMachine = _contracts[1];
        schemeRegistrar = _contracts[2];
        globalConstraintRegistrar = _contracts[3];
        upgradeScheme = _contracts[4];
        contributionReward = _contracts[5];
        foundersInitialTokens.push(100000 ether);
        foundersInitialReputation.push(100000 ether);
        founders.push(msg.sender);

        permissions.push(0x0000001F);
        permissions.push(0x0000001F);
        permissions.push(0x0000000a);
        permissions.push(0x00000001);
    }

    function internalCreateDao(string calldata _orgName, string calldata _metaData) external returns(address) {
        address payable _avatar = address(uint160(daoCreator.forgeOrg(
            _orgName,
            "CTKN",
            "CTKN",
            founders,
            foundersInitialTokens,
            foundersInitialReputation,
            UController(address(0)),
            0)));

            avatar = _avatar;

            {
                QuorumVote _quorumVote = QuorumVote(votingMachine);
                SchemeRegistrar _schemeRegistrar = SchemeRegistrar(schemeRegistrar);
                GlobalConstraintRegistrar _globalConstraintRegistrar = GlobalConstraintRegistrar(globalConstraintRegistrar);
                UpgradeScheme _upgradeScheme = UpgradeScheme(upgradeScheme);
                ContributionReward _contributionReward = ContributionReward(contributionReward);
                bytes32 _voteParamHash = _quorumVote.getParametersHash(30, address(0));
                _quorumVote.setParameters(30, address(0));
                _schemeRegistrar.setParameters(_voteParamHash, _voteParamHash, _quorumVote);
                bytes32 _srParamsHash = _schemeRegistrar.getParametersHash(_voteParamHash, _voteParamHash, _quorumVote);
                _globalConstraintRegistrar.setParameters(_voteParamHash, _quorumVote);
                bytes32 _gcParamsHash = _globalConstraintRegistrar.getParametersHash(_voteParamHash, _quorumVote);
                _upgradeScheme.setParameters(_voteParamHash, _quorumVote);
                bytes32 _usParamsHash = _upgradeScheme.getParametersHash(_voteParamHash, _quorumVote);
                _contributionReward.setParameters(_voteParamHash, _quorumVote);
                bytes32 _crParamsHash = _contributionReward.getParametersHash(_voteParamHash, _quorumVote);
                schemes.push(schemeRegistrar);
                schemes.push(address(globalConstraintRegistrar));
                schemes.push(address(upgradeScheme));
                schemes.push(address(contributionReward));
                schemesParams.push(_srParamsHash);
                schemesParams.push(_gcParamsHash);
                schemesParams.push(_usParamsHash);
                schemesParams.push(_crParamsHash);
            }

        daoCreator.setSchemes(
            Avatar(_avatar),
            schemes,
            schemesParams,
            permissions,
            _metaData
        );

        return _avatar;
    }

}