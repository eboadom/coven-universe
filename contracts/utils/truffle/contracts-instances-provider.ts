import {
  ContractId,
  ContractsInstanceGetters,
  IDeployedInstances,
} from "../types"
import {getTruffleContractInstance} from "./truffle-helpers"
import {
  AvatarInstance,
  ControllerInstance,
  ReputationInstance,
} from "../../types/truffle-contracts"
import {path as rootPath} from "app-root-path"

export class ContractsInstancesProvider {
  constructor(private artifacts: Truffle.Artifacts) {}

  private getContractInstance = async <ContractInstance>(
    contractId: ContractId,
    contractAddress?: string,
  ) =>
    await getTruffleContractInstance<ContractInstance>(
      this.artifacts,
      contractId,
      contractAddress,
    )

  public getAvatarInstance = async (contractAddress?: string) =>
    await this.getContractInstance<AvatarInstance>(
      ContractId.Avatar,
      contractAddress,
    )

  public getControllerInstance = async (contractAddress?: string) =>
    await this.getContractInstance<ControllerInstance>(
      ContractId.Controller,
      contractAddress,
    )

  public getReputationInstance = async (contractAddress?: string) =>
    await this.getContractInstance<ReputationInstance>(
      ContractId.Reputation,
      contractAddress,
    )

  public getAllGetters = (): ContractsInstanceGetters => ({
    getAvatarInstance: this.getAvatarInstance,
    getControllerInstance: this.getControllerInstance,
    getReputationInstance: this.getReputationInstance,
  })

  public getCurrentDeployedInstances = async (): Promise<
    IDeployedInstances
  > => {
    const {
      getAvatarInstance,
      getControllerInstance,
      getReputationInstance,
    } = this.getAllGetters()
    const contractsAddressesFilePath = `${rootPath}/migrations/data/temp-contract-addresses.json`
    const contractsAddresses = require(contractsAddressesFilePath)
    return {
      deployedInstances: {
        avatarInstance: await getAvatarInstance(
          contractsAddresses[<string>ContractId.Avatar].address,
        ),
        controllerInstance: await getControllerInstance(
          contractsAddresses[<string>ContractId.Controller].address,
        ),
        reputationInstance: await getReputationInstance(
          contractsAddresses[<string>ContractId.Reputation].address,
        ),
      },
    }
  }
}
