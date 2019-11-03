import {
  AssetsRegistriesRegistryContract,
  MigrationsInstance,
  MigrationsContract,
  ControllerCreatorInstance,
  ControllerCreatorContract,
  DaoCreatorInstance,
  DaoCreatorContract,
  AbsoluteVoteInstance,
  AbsoluteVoteContract,
  QuorumVoteInstance,
  QuorumVoteContract,
  SchemeRegistrarInstance,
  SchemeRegistrarContract,
  UpgradeSchemeInstance,
  UpgradeSchemeContract,
  GlobalConstraintRegistrarInstance,
  GlobalConstraintRegistrarContract,
  ContributionRewardInstance,
  ContributionRewardContract,
  AvatarInstance,
  ControllerInstance,
  ReputationInstance,
  AssetWalletContract,
  AssetWalletInstance,
  WizardGuildContract,
  WizardGuildInstance,
  AssetsRegistriesRegistryInstance,
  AssetWalletFactoryInstance,
  AssetWalletFactoryContract,
  TestContractContract,
  TestContractInstance,
} from "../../types/truffle-contracts"
import {
  setupMigrationEnv,
  deployContractTruffle,
  linkLibraryToContractTruffle,
  getTruffleContractInstance,
} from "../../utils/truffle/truffle-helpers"
import {ContractId, LibraryId} from "../../utils/types"
import {
  tEthereumAddress,
  IDaoAddresses,
  getPathDeployedDaoContracts,
  getConfiguration,
} from "../../server/configuration"
import {
  tStringCurrencyUnits,
  currencyUnitsToDecimals,
  stringToBigNumber,
  ADDRESS_0x0,
} from "../../utils/common-utils"
import {
  eProposalDescription,
  eVote,
  eGrateType,
  eGrateStringIndex,
} from "../../services/DaoService"

export interface MigratorExecutorParams {
  deployMigrationsContract(args?: any[]): Promise<MigrationsInstance>
  deployControllerCreatorContract(
    args?: any[],
  ): Promise<ControllerCreatorInstance>
  deployDaoCreatorContract(args?: any[]): Promise<DaoCreatorInstance>
  deployAbsoluteVoteContract(args?: any[]): Promise<AbsoluteVoteInstance>
  deployQuorumVoteContract(args?: any[]): Promise<QuorumVoteInstance>
  deploySchemeRegistrarContract(args?: any[]): Promise<SchemeRegistrarInstance>
  deployUpgradeSchemeContract(args?: any[]): Promise<UpgradeSchemeInstance>
  deployContributionRewardContract(
    args?: any[],
  ): Promise<ContributionRewardInstance>
  deployGlobalConstraintRegistrarContract(
    args?: any[],
  ): Promise<GlobalConstraintRegistrarInstance>
  deployWizardGuild(args?: any[]): Promise<WizardGuildInstance>
  deployAssetsRegistriesRegistry(
    args?: any[],
  ): Promise<AssetsRegistriesRegistryInstance>
  deployAssetWalletFactory(args?: any[]): Promise<AssetWalletFactoryInstance>
  deployAssetWallet(args?: any[]): Promise<AssetWalletInstance>
  deployTestContract(args?: any[]): Promise<TestContractInstance>
  linkLibraryToContract(
    libraryId: LibraryId,
    contractId: ContractId | LibraryId,
  ): Promise<void>
  getAvatarInstance(contractAddress: string): Promise<AvatarInstance>
  getControllerInstance(contractAddress?: string): Promise<ControllerInstance>
  getReputationInstance(contractAddress?: string): Promise<ReputationInstance>
  getAssetWalletInstance(contractAddress?: string): Promise<AssetWalletInstance>
  getContractInstance<ContractInstance>(
    contractId: ContractId,
    contractAddress?: string,
  ): Promise<ContractInstance>
  createProposal(
    avatarAddress: tEthereumAddress,
    benificiary: tEthereumAddress,
    reputationChange: tStringCurrencyUnits,
    daoTokenChange?: tStringCurrencyUnits,
  ): Promise<Truffle.TransactionResponse>
  voteProposal(
    voter: tEthereumAddress, // The voter (it's possible to vote on behalf of someone)
    proposalId: string,
    vote: eVote,
    reputationToUse: tStringCurrencyUnits, // If (-1), it will use all the owned reputation
  ): Promise<Truffle.TransactionResponse>
  voteProposalWithWizardWallet(
    wizardWallet: tEthereumAddress,
    proposalId: string,
    vote: eVote,
    reputationToUse: tStringCurrencyUnits, // If (-1), it will use all the owned reputation
  ): Promise<Truffle.TransactionResponse>
  redeemReputation(proposalId: string): Promise<any>
  deployNewCowven(
    cowvenName: string,
    tokenCowvenname: string,
    tokenCowvenSymbol: string,
    description: string,
    initialFoundersRewards: string[][],
    grate: eGrateType,
  ): Promise<Truffle.TransactionResponse>
  initCowvenSchemes(
    avatarAddress: tEthereumAddress,
  ): Promise<Truffle.TransactionResponse>
  accounts: Truffle.Accounts
  network: string
}

export const migrationHandler = (
  migrationMessage: string,
  artifacts: Truffle.Artifacts,
  migrationExecutor: (params: MigratorExecutorParams) => Promise<void>,
) => async (
  deployer: Truffle.Deployer,
  network: string,
  accounts: Truffle.Accounts,
) => {
  await setupMigrationEnv(deployer, network, migrationMessage)
  const deployContract = async <Contract, ContractInstance>(
    contractId: ContractId | LibraryId,
    args?: any[],
  ) => {
    return await deployContractTruffle<Contract, ContractInstance>(
      artifacts,
      deployer,
      contractId,
      args,
    )
  }
  const linkLibraryToContract = async (
    libraryId: LibraryId,
    contractId: ContractId | LibraryId,
  ) =>
    await linkLibraryToContractTruffle(
      artifacts,
      deployer,
      libraryId,
      contractId,
    )
  const getContractInstance = async <ContractInstance>(
    contractId: ContractId,
    contractAddress?: string,
  ) =>
    await getTruffleContractInstance<ContractInstance>(
      artifacts,
      contractId,
      contractAddress,
    )
  const deployMigrationsContract = async (args?: any[]) =>
    await deployContract<MigrationsContract, MigrationsInstance>(
      ContractId.Migrations,
      args,
    )
  const deployControllerCreatorContract = async (args?: any[]) =>
    await deployContract<ControllerCreatorContract, ControllerCreatorInstance>(
      ContractId.ControllerCreator,
      args,
    )
  const deployDaoCreatorContract = async (args?: any[]) =>
    await deployContract<DaoCreatorContract, DaoCreatorInstance>(
      ContractId.DaoCreator,
      args,
    )

  const deployAbsoluteVoteContract = async (args?: any[]) =>
    await deployContract<AbsoluteVoteContract, AbsoluteVoteInstance>(
      ContractId.AbsoluteVote,
      args,
    )

  const deployQuorumVoteContract = async (args?: any[]) =>
    await deployContract<QuorumVoteContract, QuorumVoteInstance>(
      ContractId.QuorumVote,
      args,
    )

  const deploySchemeRegistrarContract = async (args?: any[]) =>
    await deployContract<SchemeRegistrarContract, SchemeRegistrarInstance>(
      ContractId.SchemeRegistrar,
      args,
    )

  const deployUpgradeSchemeContract = async (args?: any[]) =>
    await deployContract<UpgradeSchemeContract, UpgradeSchemeInstance>(
      ContractId.UpgradeScheme,
      args,
    )

  const deployGlobalConstraintRegistrarContract = async (args?: any[]) =>
    await deployContract<
      GlobalConstraintRegistrarContract,
      GlobalConstraintRegistrarInstance
    >(ContractId.GlobalConstraintRegistrar, args)

  const deployContributionRewardContract = async (args?: any[]) =>
    await deployContract<
      ContributionRewardContract,
      ContributionRewardInstance
    >(ContractId.ContributionReward, args)

  const deployAssetsRegistriesRegistry = async (args?: any[]) =>
    await deployContract<
      AssetsRegistriesRegistryContract,
      AssetsRegistriesRegistryInstance
    >(ContractId.AssetsRegistriesRegistry, args)

  const deployAssetWalletFactory = async (args?: any[]) =>
    await deployContract<
      AssetWalletFactoryContract,
      AssetWalletFactoryInstance
    >(ContractId.AssetWalletFactory, args)

  const deployAssetWallet = async (args?: any[]) =>
    await deployContract<AssetWalletContract, AssetWalletInstance>(
      ContractId.AssetWallet,
      args,
    )

  const deployTestContract = async (args?: any[]) =>
    await deployContract<TestContractContract, TestContractInstance>(
      ContractId.TestContract,
      args,
    )

  const deployWizardGuild = async (args?: any[]) =>
    await deployContract<WizardGuildContract, WizardGuildInstance>(
      ContractId.WizardGuild,
      args,
    )

  const getAvatarInstance = async (contractAddress: string) =>
    await getContractInstance<AvatarInstance>(
      ContractId.Avatar,
      contractAddress,
    )

  const getControllerInstance = async (contractAddress?: string) =>
    await getContractInstance<ControllerInstance>(
      ContractId.Controller,
      contractAddress,
    )

  const getReputationInstance = async (contractAddress?: string) =>
    await getContractInstance<ReputationInstance>(
      ContractId.Reputation,
      contractAddress,
    )
  const getContributionRewardInstance = async (contractAddress?: string) =>
    await getContractInstance<ContributionRewardInstance>(
      ContractId.ContributionReward,
      contractAddress,
    )

  const getQuorumVoteInstance = async (contractAddress?: string) =>
    await getContractInstance<QuorumVoteInstance>(
      ContractId.QuorumVote,
      contractAddress,
    )

  const getAssetWalletInstance = async (contractAddress?: string) =>
    await getContractInstance<AssetWalletInstance>(
      ContractId.AssetWallet,
      contractAddress,
    )

  const getDaoCreatorInstance = async (contractAddress?: string) =>
    await getContractInstance<DaoCreatorInstance>(
      ContractId.DaoCreator,
      contractAddress,
    )

  // TODO: review parameters
  const createProposal = async (
    avatarAddress: tEthereumAddress,
    benificiary: tEthereumAddress,
    reputationChange: tStringCurrencyUnits,
    daoTokenChange?: tStringCurrencyUnits,
  ) => {
    const contributionRewardInstance = await getContributionRewardInstance()
    return await contributionRewardInstance.proposeContributionReward(
      avatarAddress,
      eProposalDescription.MINT_REPUTATION,
      currencyUnitsToDecimals(stringToBigNumber(reputationChange), 18),
      [
        daoTokenChange
          ? currencyUnitsToDecimals(stringToBigNumber(daoTokenChange), 18)
          : 0,
        0,
        0,
        0,
        1,
      ],
      ADDRESS_0x0,
      benificiary,
    )
  }

  const voteProposal = async (
    voter: tEthereumAddress, // The voter (it's possible to vote on behalf of someone)
    proposalId: string,
    vote: eVote,
    reputationToUse: tStringCurrencyUnits, // If (-1), it will use all the owned reputation
  ) => {
    const convertedReputation =
      reputationToUse === "-1"
        ? "0"
        : currencyUnitsToDecimals(stringToBigNumber(reputationToUse), 18)
    const quorumVoteInstance = await getQuorumVoteInstance()
    try {
      return await quorumVoteInstance.vote(
        proposalId,
        vote,
        convertedReputation,
        voter,
      )
    } catch (error) {
      console.log("Error. Voting proposal")
      console.log(error)
      throw new Error()
    }
  }

  const voteProposalWithWizardWallet = async (
    wizardWallet: tEthereumAddress,
    proposalId: string,
    vote: eVote,
    reputationToUse: tStringCurrencyUnits, // If (-1), it will use all the owned reputation
  ) => {
    const convertedReputation =
      reputationToUse === "-1"
        ? "0"
        : currencyUnitsToDecimals(stringToBigNumber(reputationToUse), 18)
    const wizardWalletInstance = await getAssetWalletInstance(wizardWallet)
    const votingMachine = await getQuorumVoteInstance()

    return await wizardWalletInstance.genericCall(
      votingMachine.address,
      await votingMachine.contract.methods
        .vote(proposalId, vote, convertedReputation, wizardWallet)
        .estimateGas(),
      0,
      votingMachine.contract.methods
        .vote(proposalId, vote, convertedReputation, wizardWallet)
        .encodeABI(),
    )
  }

  const redeemReputation = async (proposalId: string) => {
    const contributionRewardInstance = await getContributionRewardInstance()
    const avatarInstance = await getAvatarInstance(
      (<IDaoAddresses>require(getPathDeployedDaoContracts(network))).Avatar,
    )
    return await contributionRewardInstance.redeemReputation(
      proposalId,
      avatarInstance.address,
    )
  }

  const deployNewCowven = async (
    cowvenName: string,
    tokenCowvenname: string,
    tokenCowvenSymbol: string,
    description: string,
    initialFoundersRewards: string[][],
    grate: eGrateType,
  ) => {
    const daoCreatorInstance = await getDaoCreatorInstance(
      (<IDaoAddresses>require(getPathDeployedDaoContracts(network))).DaoCreator,
    )
    return await daoCreatorInstance.forgeOrg(
      cowvenName,
      tokenCowvenname,
      tokenCowvenSymbol,
      initialFoundersRewards.map(tuple => tuple[0]),
      initialFoundersRewards.map(tuple => tuple[1]),
      eGrateStringIndex[grate],
      description,
    )
  }

  // TODO Check possible non-initialization problems with getConfiguration()
  const initCowvenSchemes = async (avatarAddress: tEthereumAddress) => {
    const daoCreatorInstance = await getDaoCreatorInstance(
      (<IDaoAddresses>require(getPathDeployedDaoContracts(network))).DaoCreator,
    )
    const {
      defaultDaoParams: {DefaultSchemes, SchemesParams, DefaultPermissions},
    } = getConfiguration()
    return await daoCreatorInstance.setSchemes(
      avatarAddress,
      DefaultSchemes,
      SchemesParams,
      DefaultPermissions,
      "",
    )
  }

  const executorParams: MigratorExecutorParams = {
    accounts,
    network,
    deployMigrationsContract,
    deployControllerCreatorContract,
    deployDaoCreatorContract,
    deployAbsoluteVoteContract,
    deployQuorumVoteContract,
    deploySchemeRegistrarContract,
    deployUpgradeSchemeContract,
    deployGlobalConstraintRegistrarContract,
    deployContributionRewardContract,
    deployWizardGuild,
    deployAssetsRegistriesRegistry,
    deployAssetWalletFactory,
    deployAssetWallet,
    deployTestContract,
    linkLibraryToContract,
    getContractInstance,
    getAvatarInstance,
    getReputationInstance,
    getControllerInstance,
    getAssetWalletInstance,
    createProposal,
    voteProposal,
    voteProposalWithWizardWallet,
    redeemReputation,
    deployNewCowven,
    initCowvenSchemes,
  }
  await migrationExecutor(executorParams)
}
