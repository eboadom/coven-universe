import {CheezyDaoCoreEnv} from "./cheezy-dao-core-env"
import {EthereumNetwork, MigratorExecutorParams} from "../types"

export class CheezyDaoMigrationsEnv extends CheezyDaoCoreEnv {
  constructor(artifacts: Truffle.Artifacts) {
    super(artifacts)
  }

  public setupMigrationEnv = async (
    deployer: Truffle.Deployer,
    network: string,
    introMessage: string,
  ) => {
    if (!(<EthereumNetwork>network)) {
      throw new Error(`Error. Invalid Ethereum network ${network}`)
    }
    console.log(`[${network}] ${introMessage}`)
    await deployer
  }

  public getMigrationHandler = (
    migrationMessage: string,
    migrationExecutor: (params: MigratorExecutorParams) => Promise<void>,
  ) => {
    return async (
      deployer: Truffle.Deployer,
      network: string,
      accounts: Truffle.Accounts,
    ) => {
      await this.setupMigrationEnv(deployer, network, migrationMessage)

      const executorParams: MigratorExecutorParams = {
        ...this.contractsInstancesProvider.getAllGetters(),
        ...this.contractsDeploymentsProvider.getAllDeploymentFunctions(
          deployer,
        ),
        accounts,
      }
      await migrationExecutor(executorParams)
    }
  }
}

export const migrationHandler = (
  migrationMessage: string,
  artifacts: Truffle.Artifacts,
  migrationExecutor: (params: MigratorExecutorParams) => Promise<void>,
) =>
  new CheezyDaoMigrationsEnv(artifacts).getMigrationHandler(
    migrationMessage,
    migrationExecutor,
  )
