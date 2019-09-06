import {IEthereumTransactionModel} from "../services/ContractService"
import {getConfiguration} from "../server/configuration"

const DEFAULT_MAX_GAS_REQUIRED = 700000

const estimateGas = async (tx: IEthereumTransactionModel): Promise<string> => {
  let estimatedGas = DEFAULT_MAX_GAS_REQUIRED
  const configuration = getConfiguration()

  try {
    estimatedGas = await configuration.web3.eth.estimateGas(tx)
  } catch (e) {
    console.log(
      "There was an error while estimating the gas for the transaction: ",
      e,
    )
  }
  return estimatedGas.toString()
}

export const txWithEstimatedGas = async (
  tx: IEthereumTransactionModel,
): Promise<IEthereumTransactionModel> => {
  tx.gas = await estimateGas(tx)
  return tx
}
