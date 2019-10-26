import {migrationHandler} from "../../utils/migration-handler"
import {
  DAOName,
  TokenDAOName,
  TokenDAOSymbol,
  quorumVoteRequiredThreshold,
  devFundTokens,
  devFundReputation,
  genecheezeDaoDescription,
} from "../../data/development-data"
import {writeObjectToFile, ADDRESS_0x0} from "../../../utils/common-utils"
import {
  IDaoAddresses,
  getPathDeployedDaoContracts,
  getPathDaoDefaultParams,
  IDaoDefaultParams,
} from "../../../server/configuration"
import {eGrateStringIndex} from "../../../services/DaoService"

export const deployDAOMigration = migrationHandler(
  "Deploy the GeneCheeze Cowven",
  artifacts,
  async ({
    accounts,
    network,
    deployControllerCreatorContract,
    deployDaoCreatorContract,
    deployQuorumVoteContract,
    deploySchemeRegistrarContract,
    deployUpgradeSchemeContract,
    deployGlobalConstraintRegistrarContract,
    deployContributionRewardContract,
    getAvatarInstance,
    getControllerInstance,
  }) => {
    // // Factory contract to deploy the organisation's Controller. No owner
    const controllerCreatorInstance = await deployControllerCreatorContract()

    // Factory contract used to forge the organisation (explained below)
    const daoCreatorInstance = await deployDaoCreatorContract([
      controllerCreatorInstance.address,
    ])

    const devWalletAddress = accounts[0]
    // Array Forge params:
    // - founders: entities who will receive reputation and tokens initially
    // - initialReputation: initial reputation amount received by each founder
    // - initialTokens: initial token amount received by each founder
    const initialFoundersRewards = [
      [devWalletAddress, devFundReputation, devFundTokens],
    ]
    const founders = initialFoundersRewards.map(tuple => tuple[0])
    const initialReputation = initialFoundersRewards.map(tuple => tuple[1])
    const initialTokens = initialFoundersRewards.map(tuple => tuple[2])
    const grate = eGrateStringIndex.MOLD

    // Forge of the organisation:
    // - Creation of the Token of the organisation
    // - Creation of the Reputation contract of the organisation
    // - Creation of an Avatar for the organisation (Public "face" of the organisation,
    //     managed by the rules on the Controller), with organisation name,
    //     token and reputation
    // - Minting of initial tokens and reputation for founders.
    // - Creation of the organisation's Controller through the ControllerCreator.create
    // - Transfer the ownership of the Avatar, Token and Reputation to the Controller
    const resTxForgeOrg = await daoCreatorInstance.forgeOrg(
      DAOName,
      TokenDAOName,
      TokenDAOSymbol,
      founders,
      initialReputation,
      grate,
      genecheezeDaoDescription,
    )
    const newAvatarAddress = resTxForgeOrg.logs[0].args._avatar
    const avatarInstance = await getAvatarInstance(newAvatarAddress)

    // Votation machine encapsulating the votation logic:
    //   It receives proposals from schemes through a propose() function,
    //   manages the voting process and, after each vote, if this one was
    //   decisive, calls back the scheme to execute the logic of the proposal
    const votingMachineInstance = await deployQuorumVoteContract()

    // Schemes:
    //   Smart contracts that receive proposals, delegate the voting process to
    //   voting machines, receive the callback on proposal accepted by the
    //   voting machine and, finally, execute the logic of the proposal on the
    //   controller
    // Scheme used to register/unregister schemes of the organisation
    const schemeRegistrarInstance = await deploySchemeRegistrarContract()
    // Scheme used to change the controller of an organisation
    const upgradeSchemeInstance = await deployUpgradeSchemeContract()
    // Scheme to register/unregister global constraints of the organisation
    const globalConstraintRegistarInstance = await deployGlobalConstraintRegistrarContract()
    // Scheme used to propose rewards to an external entity
    const contributionRewardInstance = await deployContributionRewardContract()

    // Used to generate a hash from some parameters that will be used afterwards
    const voteParametersHash = await votingMachineInstance.getParametersHash(
      quorumVoteRequiredThreshold,
      ADDRESS_0x0,
    )

    await votingMachineInstance.setParameters(
      quorumVoteRequiredThreshold,
      ADDRESS_0x0,
    )

    // Creates and sets voting and schemes configuration
    // TODO: Get a better understanding of this part
    await schemeRegistrarInstance.setParameters(
      voteParametersHash,
      voteParametersHash,
      votingMachineInstance.address,
    )
    const schemeRegisterParams = await schemeRegistrarInstance.getParametersHash(
      voteParametersHash,
      voteParametersHash,
      votingMachineInstance.address,
    )
    await globalConstraintRegistarInstance.setParameters(
      voteParametersHash,
      votingMachineInstance.address,
    )
    const schemeGCRegisterParams = await globalConstraintRegistarInstance.getParametersHash(
      voteParametersHash,
      votingMachineInstance.address,
    )
    await upgradeSchemeInstance.setParameters(
      voteParametersHash,
      votingMachineInstance.address,
    )
    const schemeUpgradeParams = await upgradeSchemeInstance.getParametersHash(
      voteParametersHash,
      votingMachineInstance.address,
    )
    await contributionRewardInstance.setParameters(
      voteParametersHash,
      votingMachineInstance.address,
    )
    const contributionRewardParams = await contributionRewardInstance.getParametersHash(
      voteParametersHash,
      votingMachineInstance.address,
    )

    const schemes = [
      schemeRegistrarInstance.address,
      globalConstraintRegistarInstance.address,
      upgradeSchemeInstance.address,
      contributionRewardInstance.address,
    ]

    const schemesParams = [
      schemeRegisterParams,
      schemeGCRegisterParams,
      schemeUpgradeParams,
      contributionRewardParams,
    ]

    // A bitwise flags of permissions,
    // All 0: Not registered,
    // 1st bit: Flag if the scheme is registered,
    // 2nd bit: Scheme can register other schemes
    // 3rd bit: Scheme can add/remove global constraints
    // 4th bit: Scheme can upgrade the controller
    // 5th bit: Scheme can call genericCall on behalf of
    //          the organization avatar
    const permissions = ["0x0000001F", "0x00000005", "0x0000000a", "0x00000001"]

    // Setting of the initial schemes on the Controller through the DaoCreator
    const resSetSchemesTx = await daoCreatorInstance.setSchemes(
      avatarInstance.address,
      schemes,
      schemesParams,
      permissions,
      "metaData",
    )

    const controllerInstance = await getControllerInstance(
      await avatarInstance.owner(),
    )
    const daoTokenAddress = await controllerInstance.nativeToken()
    const reputationAddress = await controllerInstance.nativeReputation()

    const deployedDaoContracts: IDaoAddresses = {
      DaoCreator: daoCreatorInstance.address,
      Avatar: avatarInstance.address,
      Reputation: reputationAddress,
      Controller: controllerInstance.address,
      DAOToken: daoTokenAddress,
      ContributionReward: contributionRewardInstance.address,
      QuorumVote: votingMachineInstance.address,
    }

    const daoDefaultParams: IDaoDefaultParams = {
      DefaultSchemes: schemes,
      SchemesParams: schemesParams,
      DefaultPermissions: permissions,
    }

    // Persistence in a json file of the addresses of contracts deployed by other contracts
    await writeObjectToFile(
      getPathDeployedDaoContracts(network),
      deployedDaoContracts,
    )

    console.log(require(getPathDeployedDaoContracts(network)))

    // Persistence in a json file of the default scheme-related params to create new daos
    await writeObjectToFile(getPathDaoDefaultParams(network), daoDefaultParams)
    console.log(getPathDaoDefaultParams(network))
  },
)

module.exports = deployDAOMigration
