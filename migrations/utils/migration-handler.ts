import {
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
} from "../../types/truffle-contracts"
import {
  setupMigrationEnv,
  deployContractTruffle,
  linkLibraryToContractTruffle,
  getTruffleContractInstance,
} from "../../utils/truffle/truffle-helpers"
import {ContractId, LibraryId} from "../../utils/types"

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
  linkLibraryToContract(
    libraryId: LibraryId,
    contractId: ContractId | LibraryId,
  ): Promise<void>
  getAvatarInstance(contractAddress?: string): Promise<AvatarInstance>
  getControllerInstance(contractAddress?: string): Promise<ControllerInstance>
  getReputationInstance(contractAddress?: string): Promise<ReputationInstance>
  getContractInstance<ContractInstance>(
    contractId: ContractId,
    contractAddress?: string,
  ): Promise<ContractInstance>
  accounts: Truffle.Accounts
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

  const getAvatarInstance = async (contractAddress?: string) =>
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

  const executorParams: MigratorExecutorParams = {
    accounts,
    deployMigrationsContract,
    deployControllerCreatorContract,
    deployDaoCreatorContract,
    deployAbsoluteVoteContract,
    deployQuorumVoteContract,
    deploySchemeRegistrarContract,
    deployUpgradeSchemeContract,
    deployGlobalConstraintRegistrarContract,
    deployContributionRewardContract,
    linkLibraryToContract,
    getContractInstance,
    getAvatarInstance,
    getReputationInstance,
    getControllerInstance
  }
  await migrationExecutor(executorParams)
}
