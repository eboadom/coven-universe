import {ContractId, LibraryId, ContractsDeploymentFunctions} from "../types"
import {deployContractTruffle} from "./truffle-helpers"
import {
  MigrationsContract,
  MigrationsInstance,
  ControllerCreatorContract,
  ControllerCreatorInstance,
  DaoCreatorContract,
  DaoCreatorInstance,
  AbsoluteVoteContract,
  AbsoluteVoteInstance,
  QuorumVoteContract,
  QuorumVoteInstance,
  SchemeRegistrarContract,
  SchemeRegistrarInstance,
  UpgradeSchemeContract,
  UpgradeSchemeInstance,
  GlobalConstraintRegistrarContract,
  GlobalConstraintRegistrarInstance,
  ContributionRewardContract,
  ContributionRewardInstance,
} from "../../types/truffle-contracts"

export class ContractsDeploymentsProvider {
  constructor(private artifacts: Truffle.Artifacts) {}

  private deployContract = async <Contract, ContractInstance>(
    deployer: Truffle.Deployer,
    contractId: ContractId | LibraryId,
    args?: any[],
  ) =>
    await deployContractTruffle<Contract, ContractInstance>(
      this.artifacts,
      deployer,
      contractId,
      args,
    )

  private _deployMigrationsContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<MigrationsContract, MigrationsInstance>(
        deployer,
        ContractId.Migrations,
        args,
      )
  }

  private _deployControllerCreatorContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<
        ControllerCreatorContract,
        ControllerCreatorInstance
      >(deployer, ContractId.ControllerCreator, args)
  }

  private _deployDaoCreatorContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<DaoCreatorContract, DaoCreatorInstance>(
        deployer,
        ContractId.DaoCreator,
        args,
      )
  }

  private _deployAbsoluteVoteContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<AbsoluteVoteContract, AbsoluteVoteInstance>(
        deployer,
        ContractId.AbsoluteVote,
        args,
      )
  }

  private _deployQuorumVoteContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<QuorumVoteContract, QuorumVoteInstance>(
        deployer,
        ContractId.QuorumVote,
        args,
      )
  }

  private _deploySchemeRegistrarContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<
        SchemeRegistrarContract,
        SchemeRegistrarInstance
      >(deployer, ContractId.SchemeRegistrar, args)
  }

  private _deployUpgradeSchemeContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<UpgradeSchemeContract, UpgradeSchemeInstance>(
        deployer,
        ContractId.UpgradeScheme,
        args,
      )
  }

  private _deployGlobalConstraintRegistrarContract = (
    deployer: Truffle.Deployer,
  ) => {
    return async (args?: any[]) =>
      await this.deployContract<
        GlobalConstraintRegistrarContract,
        GlobalConstraintRegistrarInstance
      >(deployer, ContractId.GlobalConstraintRegistrar, args)
  }

  private _deployContributionRewardContract = (deployer: Truffle.Deployer) => {
    return async (args?: any[]) =>
      await this.deployContract<
        ContributionRewardContract,
        ContributionRewardInstance
      >(deployer, ContractId.ContributionReward, args)
  }

  public getAllDeploymentFunctions = (
    deployer: Truffle.Deployer,
  ): ContractsDeploymentFunctions => ({
    deployMigrationsContract: this._deployMigrationsContract(deployer),
    deployControllerCreatorContract: this._deployControllerCreatorContract(
      deployer,
    ),
    deployDaoCreatorContract: this._deployDaoCreatorContract(deployer),
    deployAbsoluteVoteContract: this._deployAbsoluteVoteContract(deployer),
    deployQuorumVoteContract: this._deployQuorumVoteContract(deployer),
    deploySchemeRegistrarContract: this._deploySchemeRegistrarContract(
      deployer,
    ),
    deployUpgradeSchemeContract: this._deployUpgradeSchemeContract(deployer),
    deployGlobalConstraintRegistrarContract: this._deployGlobalConstraintRegistrarContract(
      deployer,
    ),
    deployContributionRewardContract: this._deployContributionRewardContract(
      deployer,
    ),
  })
}
