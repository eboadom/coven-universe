import {
  AvatarInstance,
  ControllerInstance,
  ReputationInstance,
  MigrationsInstance,
  ControllerCreatorInstance,
  DaoCreatorInstance,
  AbsoluteVoteInstance,
  QuorumVoteInstance,
  SchemeRegistrarInstance,
  UpgradeSchemeInstance,
  ContributionRewardInstance,
  GlobalConstraintRegistrarInstance,
} from "../types/truffle-contracts"

export const enum ContractId {
  Migrations = "Migrations",
  ControllerCreator = "ControllerCreator",
  DaoCreator = "DaoCreator",
  Avatar = "Avatar",
  AbsoluteVote = "AbsoluteVote",
  QuorumVote = "QuorumVote",
  SchemeRegistrar = "SchemeRegistrar",
  UpgradeScheme = "UpgradeScheme",
  GlobalConstraintRegistrar = "GlobalConstraintRegistrar",
  ContributionReward = "ContributionReward",
  Controller = "Controller",
  Reputation = "Reputation",
}

export const enum LibraryId {}

export const enum EthereumNetwork {
  development = "development",
  kovan = "kovan",
  main = "main",
}

export interface ContractsInstanceGetters {
  getAvatarInstance(contractAddress?: string): Promise<AvatarInstance>
  getControllerInstance(contractAddress?: string): Promise<ControllerInstance>
  getReputationInstance(contractAddress?: string): Promise<ReputationInstance>
}

export interface ITruffleAccounts {
  accounts: Truffle.Accounts
}

export interface ContractsDeploymentFunctions {
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
}

export interface ContractsLinkingFunctions {}

export interface ContractsActionsFunctions {}

export interface MigratorExecutorParams
  extends ContractsInstanceGetters,
    ITruffleAccounts,
    ContractsDeploymentFunctions,
    ContractsLinkingFunctions,
    ContractsActionsFunctions {}

export interface IContractsInstances {
  avatarInstance: AvatarInstance
  controllerInstance: ControllerInstance
  reputationInstance: ReputationInstance
}

export interface IDeployedInstances {
  deployedInstances: IContractsInstances
}

export interface TestsEnvParams
  extends ContractsInstanceGetters,
    ITruffleAccounts,
    ContractsActionsFunctions,
    IDeployedInstances {}
