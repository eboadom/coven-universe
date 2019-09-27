pragma solidity ^0.5.4;

import "./UniversalScheme.sol";
import "../controller/UController.sol";
import "../controller/Controller.sol";


/**
 * @title ControllerCreator for creating a single controller.
 */

contract ControllerCreator {

    function create(Avatar _avatar) public returns(address) {
        Controller controller = new Controller(_avatar);
        controller.registerScheme(msg.sender, bytes32(0), bytes4(0x0000001f), address(_avatar));
        controller.unregisterScheme(address(this), address(_avatar));
        return address(controller);
    }
}

/**
 * @title Genesis Scheme that creates organizations
 */


contract DaoCreator {

    mapping(address=>address) public locks;

    event NewOrg (
        address indexed _avatar,
        string indexed _cowvenId,
        string indexed _grate,
        string _cowvenDescription,
        address _reputation,
        address _token
    );
    event InitialSchemesSet (address _avatar);

    ControllerCreator private controllerCreator;

    constructor(ControllerCreator _controllerCreator) public {
        controllerCreator = _controllerCreator;
    }

    /**
      * @dev addFounders add founders to the organization.
      *      this function can be called only after forgeOrg and before setSchemes
      * @param _avatar the organization avatar
      * @param _founders An array with the addresses of the founders of the organization
      *  receive in the new organization
      * @param _foundersReputationAmount An array of amount of reputation that the
      *   founders receive in the new organization
      * @return bool true or false
      */
    function addFounders (
        Avatar _avatar,
        address[] calldata _founders,
        uint[] calldata _foundersReputationAmount
    )
    external
    returns(bool)
    {
        require(_founders.length == _foundersReputationAmount.length);
        require(_founders.length > 0);
        require(locks[address(_avatar)] == msg.sender);
        // Mint token and reputation for founders:
        for (uint256 i = 0; i < _founders.length; i++) {
            require(_founders[i] != address(0));
            if (_foundersReputationAmount[i] > 0) {
                ControllerInterface(
                _avatar.owner()).mintReputation(_foundersReputationAmount[i], _founders[i], address(_avatar));
            }
        }
        return true;
    }

  /**
    * @dev Create a new organization
    * @param _founders An array with the addresses of the founders of the organization
    *  receive in the new organization
    * @param _foundersReputationAmount An array of amount of reputation that the
    *   founders receive in the new organization
    * @return The address of the avatar of the controller
    */
    function forgeOrg (
        string calldata _orgName,
        string calldata _tokenName,
        string calldata _tokenSymbol,
        address[] calldata _founders,
        uint[] calldata _foundersReputationAmount,
        string calldata _cowvenGrate,
        string calldata _cowvenDescription
    )
    external
    returns(address)
    {
        //The call for the private function is needed to bypass a deep stack issues
        return _forgeOrg(
            _orgName,
            _tokenName,
            _tokenSymbol,
            _founders,
            _foundersReputationAmount,
            _cowvenGrate,
            _cowvenDescription);
    }

     /**
      * @dev Set initial schemes for the organization.
      * @param _avatar organization avatar (returns from forgeOrg)
      * @param _schemes the schemes to register for the organization
      * @param _params the schemes's params
      * @param _permissions the schemes permissions.
      * @param _metaData dao meta data hash
      */
    function setSchemes (
        Avatar _avatar,
        address[] calldata _schemes,
        bytes32[] calldata _params,
        bytes4[] calldata _permissions,
        string calldata _metaData
    )
        external
    {
        // this action can only be executed by the account that holds the lock
        // for this controller
        require(locks[address(_avatar)] == msg.sender);
        // register initial schemes:
        ControllerInterface controller = ControllerInterface(_avatar.owner());
        for (uint256 i = 0; i < _schemes.length; i++) {
            controller.registerScheme(_schemes[i], _params[i], _permissions[i], address(_avatar));
        }
        controller.metaData(_metaData, _avatar);
        // Unregister self:
        controller.unregisterScheme(address(this), address(_avatar));
        // Remove lock:
        delete locks[address(_avatar)];
        emit InitialSchemesSet(address(_avatar));
    }

    /**
     * @dev Create a new organization
     * @param _founders An array with the addresses of the founders of the organization
     * @param _foundersReputationAmount An array of amount of reputation that the
     *   founders receive in the new organization
     * @return The address of the avatar of the controller
     */
    function _forgeOrg (
        string memory _orgName,
        string memory _tokenName,
        string memory _tokenSymbol,
        address[] memory _founders,
        uint[] memory _foundersReputationAmount,
        string memory _cowvenGrate,
        string memory _cowvenDescription
    ) private returns(address)
    {
        // Create Token, Reputation and Avatar:
        require(_founders.length == _foundersReputationAmount.length);
        require(_founders.length > 0);
        DAOToken  nativeToken = new DAOToken(_tokenName, _tokenSymbol, 1000000 ether);
        Reputation  nativeReputation = new Reputation();
        Avatar  avatar = new Avatar(_orgName, nativeToken, nativeReputation);
        ControllerInterface  controller;

        // Mint token and reputation for founders:
        for (uint256 i = 0; i < _founders.length; i++) {
            require(_founders[i] != address(0));
            if (_foundersReputationAmount[i] > 0) {
                nativeReputation.mint(_founders[i], _foundersReputationAmount[i]);
            }
        }

        // Create Controller:
        // if (UController(0) == _uController) {
            controller = ControllerInterface(controllerCreator.create(avatar));
            avatar.transferOwnership(address(controller));
            // Transfer ownership:
            nativeToken.transferOwnership(address(controller));
            nativeReputation.transferOwnership(address(controller));
        // } else {
        //     controller = _uController;
        //     avatar.transferOwnership(address(controller));
        //     // Transfer ownership:
        //     nativeToken.transferOwnership(address(controller));
        //     nativeReputation.transferOwnership(address(controller));
        //     _uController.newOrganization(avatar);
        // }

        locks[address(avatar)] = msg.sender;

        emit NewOrg (address(avatar), _orgName, _cowvenGrate, _cowvenDescription, address(nativeReputation), address(nativeToken));
        return (address(avatar));
    }
}
