pragma solidity ^0.5.4;

import "@daostack/arc/contracts/universalSchemes/DaoCreator.sol" as Factories;
import "@daostack/arc/contracts/controller/UController.sol";
import "@daostack/arc/contracts/controller/Avatar.sol";
import "@daostack/arc/contracts/universalSchemes/SchemeRegistrar.sol";
import "@daostack/infra/contracts/votingMachines/QuorumVote.sol";
import "@daostack/arc/contracts/universalSchemes/GlobalConstraintRegistrar.sol";
import "@daostack/arc/contracts/universalSchemes/UpgradeScheme.sol";
import "@daostack/arc/contracts/universalSchemes/ContributionReward.sol";

contract AtomicDaoCreator is Ownable {

    Factories.DaoCreator public daoCreator;

    address[] founders;
    uint256[] foundersInitialReputation;
    uint256[] foundersInitialTokens;

    address[] schemes;
    bytes32[] schemesParams;
    bytes4[] permissions;

    uint256 public quorumPrecReq = 30;

    address public votingMachine;
    address public schemeRegistrar;
    address public globalConstraintRegistrar;
    address public upgradeScheme;
    address public contributionReward;


    event DaoCreated(address indexed avatar, address indexed summoner);
    event NewQuorumPrecReq(uint256 precReq);
    event NewBasicContracts(
        address daoCreator,
        address votingMachine,
        address schemeRegistrar,
        address globalConstraintRegistrar,
        address upgradeScheme,
        address contributionReward
    );
    event NewFoundersRewards(uint256 reputationAmount, uint256 nativeTokenAmount);
    event NewSchemesPermissions(
        bytes4 schemeRegistrarPerm,
        bytes4 globalContraintRegistrarPerm,
        bytes4 schemeUpgradePerm,
        bytes4 contributionRewardPerm
    );

    constructor(address[] memory _contracts) public {
        setupBootstrapContracts(_contracts);
        setupFoundersRewards(100000 ether, 100000 ether);
        setupSchemesPermissions([bytes4(0x0000001F), bytes4(0x0000001F), bytes4(0x0000000a), bytes4(0x00000001)]);
    }

    function setupQuorumPrecReq(uint256 _precReq) public onlyOwner {
        quorumPrecReq = _precReq;
        emit NewQuorumPrecReq(_precReq);
    }

    function setupBootstrapContracts(address[] memory _bootstrapContracts) public onlyOwner {
        daoCreator = Factories.DaoCreator(_bootstrapContracts[0]);
        votingMachine = _bootstrapContracts[1];
        schemeRegistrar = _bootstrapContracts[2];
        globalConstraintRegistrar = _bootstrapContracts[3];
        upgradeScheme = _bootstrapContracts[4];
        contributionReward = _bootstrapContracts[5];

        // Set up of schemes and schemesParams
        {
            QuorumVote _quorumVote = QuorumVote(votingMachine);
            SchemeRegistrar _schemeRegistrar = SchemeRegistrar(schemeRegistrar);
            GlobalConstraintRegistrar _globalConstraintRegistrar = GlobalConstraintRegistrar(globalConstraintRegistrar);
            UpgradeScheme _upgradeScheme = UpgradeScheme(upgradeScheme);
            ContributionReward _contributionReward = ContributionReward(contributionReward);
            bytes32 _voteParamHash = _quorumVote.getParametersHash(quorumPrecReq, address(0));
            _quorumVote.setParameters(quorumPrecReq, address(0));
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
        emit NewBasicContracts(
            _bootstrapContracts[0],
            votingMachine,
            schemeRegistrar,
            globalConstraintRegistrar,
            upgradeScheme,
            contributionReward
        );
    }

    function setupFoundersRewards(uint256 _reputationAmount, uint256 _tokenAmount) public onlyOwner {
        if (foundersInitialTokens.length > 0) {
            delete foundersInitialTokens[foundersInitialTokens.length-1];
            foundersInitialTokens.length--;
            delete foundersInitialReputation[foundersInitialReputation.length-1];
            foundersInitialReputation.length--;
        }

        foundersInitialTokens.push(_tokenAmount);
        foundersInitialReputation.push(_reputationAmount);
        emit NewFoundersRewards(_reputationAmount, _tokenAmount);
    }

    function setupSchemesPermissions(bytes4[4] memory _permissions) public onlyOwner {
        if (permissions.length > 0) {
            for(uint256 i = permissions.length-1; i >= 0; i--) {
                delete permissions[i];
                permissions.length--;
            }
        }
        permissions.push(_permissions[0]);
        permissions.push(_permissions[1]);
        permissions.push(_permissions[2]);
        permissions.push(_permissions[3]);
        emit NewSchemesPermissions(_permissions[0], _permissions[1], _permissions[2], _permissions[3]);
    }

    function internalCreateDao(string calldata _orgName, string calldata _metaData) external returns(address) {
        // The founder will receive the initial reputation and native tokens
        founders.push(msg.sender);

        address payable _avatar = address(uint160(daoCreator.forgeOrg(
            _orgName,
            "ADTK",
            "ADTK",
            founders,
            foundersInitialTokens,
            foundersInitialReputation,
            UController(address(0)),
            0)));

        daoCreator.setSchemes(
            Avatar(_avatar),
            schemes,
            schemesParams,
            permissions,
            _metaData
        );

        // Removal of the founder from the storage dynamic array, as for the next dao, a new one will be needed
        delete founders[founders.length-1];
        founders.length--;

        emit DaoCreated(_avatar, msg.sender);

        return _avatar;
    }

}