import {migrationHandler} from "../../utils/migration-handler"
import {initConfiguration, configuration} from "../../../server/configuration"
import {WizardsService} from "../../../services/WizardsService"
import {DaoService, eVote} from "../../../services/DaoService"
import {devFundReputation, devFundTokens} from "../../data/development-data"

export const cowvensInteractionsMigration = migrationHandler(
  "Cowvens interactions test",
  artifacts,
  async ({
    accounts,
    createProposal,
    voteProposal,
    redeemReputation,
    voteProposalWithWizardWallet,
    network,
  }) => {
    await initConfiguration(network)
    const cowvensSummoner = accounts[0]
    const wizardsService = new WizardsService()
    const daoService = new DaoService()
    const wizardIds = [5975, 5976, 5977]

    console.log("---------------------------------")
    console.log("----- Initial state Wizards wallets -----")
    console.log("---------------------------------")
    for (const id of wizardIds) {
      console.log(JSON.stringify(await wizardsService.getWizardData(id)))
    }

    console.log()
    console.log("---------------------------------\n")

    const devWalletAddress = accounts[0]
    const initialFoundersRewards = [
      [devWalletAddress, devFundReputation, devFundTokens],
    ]

    // await deployNewCowven(
    //   "SecondCheeze",
    //   "Second Cheeze Token",
    //   "SCTK",
    //   initialFoundersRewards,
    // )

    const allDaosBasicData = await daoService.getAllCowvensBasicData()

    console.log(allDaosBasicData)

    // const txResultInitCowvenSchemes = await initCowvenSchemes(
    //   allDaosBasicData[1].avatarAddress,
    //   "SecondCheeze",
    //   eGrateStringIndex.FLAME,
    //   "The second, still important",
    // )

    // console.log(txResultInitCowvenSchemes)

    let wizardsWallets = []
    for (const id of wizardIds) {
      wizardsWallets.push(
        await wizardsService.getWizardWalletAddressByWizardId(id),
      )
    }

    const giveReputationToWizard1ProposalId = (await createProposal(
      configuration.addresses.Avatar,
      wizardsWallets[0],
      "60000",
    )).logs[0].args._proposalId
    const giveReputationToWizard2ProposalId = (await createProposal(
      configuration.addresses.Avatar,
      wizardsWallets[1],
      "20000",
    )).logs[0].args._proposalId
    const giveReputationToWizard3ProposalId = (await createProposal(
      configuration.addresses.Avatar,
      wizardsWallets[2],
      "10000",
    )).logs[0].args._proposalId

    await voteProposal(
      cowvensSummoner,
      giveReputationToWizard1ProposalId,
      eVote.YES,
      "-1",
    )

    // await voteProposal(
    //   accounts[0],
    //   giveReputationToWizard2ProposalId,
    //   eVote.YES,
    //   "1",
    // )
    // await voteProposal(
    //   accounts[0],
    //   giveReputationToWizard3ProposalId,
    //   eVote.YES,
    //   "-1",
    // )
    await redeemReputation(giveReputationToWizard1ProposalId)
    // await redeemReputation(giveReputationToWizard2ProposalId)
    // await redeemReputation(giveReputationToWizard3ProposalId)

    console.log("---------------------------------")
    console.log(
      "----- State Wizards wallets after redeem of first reputation grant-----",
    )
    console.log("---------------------------------")
    for (const id of wizardIds) {
      console.log(
        JSON.stringify(
          (await wizardsService.getWizardData(id)).wizardWalletData,
        ),
      )
    }
    console.log()
    console.log("---------------------------------\n")

    const slashReputationWizard1ProposalId = (await createProposal(
      configuration.addresses.Avatar,
      wizardsWallets[0],
      "-10000",
    )).logs[0].args._proposalId
    // const slashReputationWizard2ProposalId = (await createProposal(
    //   avatarInstance.address,
    //   wizardWallet2,
    //   "-10000",
    // )).logs[0].args._proposalId
    // const slashReputationWizard3ProposalId = (await createProposal(
    //   avatarInstance.address,
    //   wizardWallet3,
    //   "-10000",
    // )).logs[0].args._proposalId

    console.log(
      "Slash reputation from Wizard wallet 1 Proposal ID - " +
        slashReputationWizard1ProposalId,
    )
    // console.log(
    //   "Slash reputation from Wizard wallet 2 Proposal ID - " +
    //     slashReputationWizard2ProposalId,
    // )
    // console.log(
    //   "Slash reputation from Wizard wallet 3 Proposal ID - " +
    //     slashReputationWizard3ProposalId,
    // )

    await voteProposalWithWizardWallet(
      wizardsWallets[0],
      slashReputationWizard1ProposalId,
      eVote.YES,
      "-1",
    )
    // await voteProposal(
    //   accounts[0],
    //   slashReputationWizard1ProposalId,
    //   eVote.NO,
    //   "-1",
    // )
    // await voteProposal(
    //   accounts[0],
    //   slashReputationWizard2ProposalId,
    //   eVote.YES,
    //   "-1",
    // )
    // await voteProposal(
    //   accounts[0],
    //   slashReputationWizard3ProposalId,
    //   eVote.YES,
    //   "-1",
    // )

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

    // await redeemReputation(slashReputationWizard1ProposalId)
    // await redeemReputation(slashReputationWizard2ProposalId)
    // await redeemReputation(slashReputationWizard3ProposalId)

    console.log("---------------------------------")
    console.log(
      "----- State Wizards wallets after redeem of slash of reputation-----",
    )
    console.log("---------------------------------")
    for (const id of wizardIds) {
      console.log(JSON.stringify(await wizardsService.getWizardData(id)))
    }
    console.log("---------------------------------\n")

    console.log("---------------------------------")
    console.log(`----- Wizards of ${cowvensSummoner} -----`)
    console.log("---------------------------------")
    console.log(await wizardsService.getAllWizardsDataByOwner(cowvensSummoner))
    console.log("---------------------------------\n")

    console.log("----- Wallets in the 'test' -----")
    console.log("Cowvens summoner " + cowvensSummoner)
    console.log("Wizard 1 wallet " + wizardIds[0])
    console.log("Wizard 2 wallet " + wizardIds[1])
    console.log("Wizard 3 wallet " + wizardIds[2])
    console.log("---------------------------------\n")

    const allDaosInfo = await daoService.getAllDaosInfo()
    const allWizardsByOwner = await wizardsService.getAllWizardsDataByOwner(
      cowvensSummoner,
    )
    const allMembersOfDao = await daoService.getAllMembersOfDao(
      allDaosInfo[0].reputationAddress,
    )
    console.log(allMembersOfDao)
    console.log(allWizardsByOwner)
    console.log(allDaosInfo)
    console.log(allDaosInfo[0].members)

    const allContributionRewards = await daoService.getAllContributionRewardProposalsByCowven(
      allDaosInfo[0].avatarAddress,
    )
    console.log(allContributionRewards.map(a => a.voters.map(a => a.voteData)))
  },
)

module.exports = cowvensInteractionsMigration
