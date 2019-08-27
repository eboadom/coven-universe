import {ContractId, LibraryId} from "../types"
import {linkLibraryToContractTruffle} from "./truffle-helpers"
import {ContractsInstancesProvider} from "./contracts-instances-provider"
import {ContractsDeploymentsProvider} from "./contracts-deployments-provider"

export abstract class CheezyDaoCoreEnv {
  protected artifacts: Truffle.Artifacts
  protected contractsInstancesProvider: ContractsInstancesProvider
  protected contractsDeploymentsProvider: ContractsDeploymentsProvider

  constructor(artifacts: Truffle.Artifacts) {
    this.artifacts = artifacts
    this.contractsInstancesProvider = new ContractsInstancesProvider(artifacts)
    this.contractsDeploymentsProvider = new ContractsDeploymentsProvider(
      artifacts,
    )
  }

  protected linkLibraryToContract = async (
    deployer: Truffle.Deployer,
    libraryId: LibraryId,
    contractId: ContractId | LibraryId,
  ) =>
    await linkLibraryToContractTruffle(
      this.artifacts,
      deployer,
      libraryId,
      contractId,
    )
}
