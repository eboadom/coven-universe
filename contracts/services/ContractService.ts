import {tEthereumAddress, getConfiguration} from "../server/configuration"
import {txWithEstimatedGas} from "../utils/gas-utils"

export interface IEthereumTransactionModel {
  from: string
  to: string
  data?: string
  gas?: string
  value?: string
}

// Used in services for a particular smart contract, where "to" is always the same
export interface IEthereumTransactionModelDirected {
  from: string
  data?: string
  gas?: string
  value?: string
}

export type TContractGetterFromNodeByWeb3ProviderType = <ContractType>(
  web3ProviderType: EWeb3ProviderType,
  abi: any[],
  contractAddress: tEthereumAddress,
) => ContractType

export enum EWeb3ProviderType {
  HTTP = "HTTP",
  WS = "WS",
}

export class ContractService {
  protected getContractByWeb3ProviderType: TContractGetterFromNodeByWeb3ProviderType = <
    ContractType
  >(
    web3ProviderType: EWeb3ProviderType,
    abi: any[],
    contractAddress: tEthereumAddress,
  ): ContractType => {
    const {web3, web3WS} = getConfiguration()
    const {Contract} =
      web3ProviderType === EWeb3ProviderType.HTTP ? web3.eth : web3WS.eth
    return (<any>new Contract(abi, contractAddress)) as ContractType
  }

  protected txTo = async (
    to: tEthereumAddress,
    tx: IEthereumTransactionModelDirected,
  ): Promise<IEthereumTransactionModel> => await txWithEstimatedGas({...tx, to})
}
