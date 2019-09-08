import {migrationHandler} from "../../utils/migration-handler"
import {
  DAOName,
  TokenDAOName,
  TokenDAOSymbol,
  TokenDAOCap,
  quorumVoteRequiredThreshold,
  devFundTokens,
  devFundReputation,
} from "../../data/development-data"
import {
  writeObjectToFile,
  ADDRESS_0x0,
} from "../../../utils/common-utils"
import {
  IDaoAddresses,
  getPathDeployedDaoContracts,
  initConfiguration,
} from "../../../server/configuration"
import {WizardsService} from "../../../services/WizardsService"
import {DaoService, eVote} from "../../../services/DaoService"

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
    createProposal,
    voteProposal,
    redeemReputation,
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
      initialTokens,
      initialReputation,
      ADDRESS_0x0,
      TokenDAOCap,
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
      Avatar: avatarInstance.address,
      Reputation: reputationAddress,
      Controller: controllerInstance.address,
      DAOToken: daoTokenAddress,
      ContributionReward: contributionRewardInstance.address,
      QuorumVote: votingMachineInstance.address,
    }

    // Persistence in a json file of the addresses of contracts deployed by other contracts
    await writeObjectToFile(
      getPathDeployedDaoContracts(network),
      deployedDaoContracts,
    )

    // "Testing" of contribution reward

    await initConfiguration()
    const wizardsService = new WizardsService()
    const daoService = new DaoService()
    const wizardId1 = 5975
    const wizardId2 = 5976
    const wizardId3 = 5977
    const wizardWallet1 = await wizardsService.getWizardWalletAddressByWizardId(
      wizardId1,
    )
    const wizardWallet2 = await wizardsService.getWizardWalletAddressByWizardId(
      wizardId2,
    )
    const wizardWallet3 = await wizardsService.getWizardWalletAddressByWizardId(
      wizardId3,
    )
    console.log("---------------------------------")
    console.log("----- Initial state Wizards wallets -----")
    console.log("---------------------------------")
    console.log(
      (await wizardsService.getWizardData(wizardId1)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log(
      (await wizardsService.getWizardData(wizardId2)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log(
      (await wizardsService.getWizardData(wizardId1)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log()
    console.log("---------------------------------\n")

    const giveReputationToWizard1ProposalId = (await createProposal(
      avatarInstance.address,
      wizardWallet1,
      "30000",
    )).logs[0].args._proposalId
    const giveReputationToWizard2ProposalId = (await createProposal(
      avatarInstance.address,
      wizardWallet2,
      "20000",
    )).logs[0].args._proposalId
    const giveReputationToWizard3ProposalId = (await createProposal(
      avatarInstance.address,
      wizardWallet3,
      "10000",
    )).logs[0].args._proposalId
    console.log(
      "Give reputation to Wizard 1 Proposal ID- " +
        giveReputationToWizard1ProposalId,
    )
    console.log(
      "Give reputation to Wizard 2 Proposal ID- " +
        giveReputationToWizard2ProposalId,
    )
    console.log(
      "Give reputation to Wizard 3 Proposal ID- " +
        giveReputationToWizard3ProposalId,
    )

    await voteProposal(
      accounts[0],
      giveReputationToWizard1ProposalId,
      eVote.YES,
      "-1",
    )
    await voteProposal(
      accounts[0],
      giveReputationToWizard2ProposalId,
      eVote.YES,
      "-1",
    )
    await voteProposal(
      accounts[0],
      giveReputationToWizard3ProposalId,
      eVote.YES,
      "-1",
    )
    await redeemReputation(giveReputationToWizard1ProposalId)
    await redeemReputation(giveReputationToWizard2ProposalId)
    await redeemReputation(giveReputationToWizard3ProposalId)

    console.log("---------------------------------")
    console.log(
      "----- State Wizards wallets after redeem of first reputation grant-----",
    )
    console.log("---------------------------------")
    console.log(
      (await wizardsService.getWizardData(wizardId1)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log(
      (await wizardsService.getWizardData(wizardId2)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log(
      (await wizardsService.getWizardData(wizardId3)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log()
    console.log("---------------------------------\n")

    const slashReputationWizard1ProposalId = (await createProposal(
      avatarInstance.address,
      wizardWallet1,
      "-10000",
    )).logs[0].args._proposalId
    const slashReputationWizard2ProposalId = (await createProposal(
      avatarInstance.address,
      wizardWallet2,
      "-10000",
    )).logs[0].args._proposalId
    const slashReputationWizard3ProposalId = (await createProposal(
      avatarInstance.address,
      wizardWallet3,
      "-10000",
    )).logs[0].args._proposalId

    console.log(
      "Slash reputation from Wizard wallet 1 Proposal ID - " +
        slashReputationWizard1ProposalId,
    )
    console.log(
      "Slash reputation from Wizard wallet 2 Proposal ID - " +
        slashReputationWizard2ProposalId,
    )
    console.log(
      "Slash reputation from Wizard wallet 3 Proposal ID - " +
        slashReputationWizard3ProposalId,
    )

    await voteProposal(
      accounts[0],
      slashReputationWizard1ProposalId,
      eVote.YES,
      "-1",
    )
    await voteProposal(
      accounts[0],
      slashReputationWizard2ProposalId,
      eVote.YES,
      "-1",
    )
    await voteProposal(
      accounts[0],
      slashReputationWizard3ProposalId,
      eVote.YES,
      "-1",
    )

    // const slashProposalData = await votingMachineInstance.proposals(
    //   slashReputationProposalId,
    // )
    // console.log(slashProposalData);
    // console.log(
    //   (await contributionRewardInstance.organizationsProposals(
    //     avatarInstance.address,
    //     slashReputationProposalId,
    //   ))["1"].toString(),
    // )

    await redeemReputation(slashReputationWizard1ProposalId)
    await redeemReputation(slashReputationWizard2ProposalId)
    await redeemReputation(slashReputationWizard3ProposalId)

    console.log("---------------------------------")
    console.log(
      "----- State Wizards wallets after redeem of slash of reputation-----",
    )
    console.log("---------------------------------")
    console.log(
      (await wizardsService.getWizardData(wizardId1)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log(
      (await wizardsService.getWizardData(wizardId2)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log(
      (await wizardsService.getWizardData(wizardId3)).wizardWalletData
        .genecheezeDaoReputation + " reputation",
    )
    console.log()
    console.log("---------------------------------\n")

    console.log("---------------------------------")
    console.log(`----- Wizards of ${accounts[0]} -----`)
    console.log("---------------------------------")
    console.log(await wizardsService.getWizardsDataByOwner(accounts[0]))
    console.log("---------------------------------\n")

    console.log("----- Wallets in the 'test' -----")
    console.log("Account 0 " + accounts[0])
    console.log("Wizard 1 wallet " + wizardWallet1)
    console.log("Wizard 2 wallet " + wizardWallet2)
    console.log("Wizard 3 wallet " + wizardWallet3)
    console.log("---------------------------------\n")

    const allDaosInfo = await daoService.getAllDaosInfo()
    console.log(allDaosInfo)
    console.log(allDaosInfo[0].members)
  },
)

module.exports = deployDAOMigration
