import {CheezyDaoCoreEnv} from "./cheezy-dao-core-env"
import {TestsEnvParams} from "../types"

export class CheezyDaoTestsEnv extends CheezyDaoCoreEnv {
  constructor(artifacts: Truffle.Artifacts) {
    super(artifacts)
  }

  public getTestsEnv = async (
    accounts: Truffle.Accounts,
  ): Promise<TestsEnvParams> => {
    return {
      ...this.contractsInstancesProvider.getAllGetters(),
      accounts,
      deployedInstances: (await this.contractsInstancesProvider.getCurrentDeployedInstances())
        .deployedInstances,
    }
  }
}

export const getTestsEnv = (
  artifacts: Truffle.Artifacts,
  accounts: Truffle.Accounts,
) => new CheezyDaoTestsEnv(artifacts).getTestsEnv(accounts)
