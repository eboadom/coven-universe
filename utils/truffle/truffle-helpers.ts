import {EthereumNetwork, ContractId, LibraryId} from "../types"

export const setupMigrationEnv = async (
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

export const getTruffleContract = <Contract>(
  artifacts: Truffle.Artifacts,
  contractId: ContractId | LibraryId,
): Truffle.Contract<Contract> => {
  // TODO: review the type cast
  return artifacts.require(<string>contractId)
}

export const getTruffleContractInstance = async <ContractInstance>(
  artifacts: Truffle.Artifacts,
  contractId: ContractId,
  contractAddress?: string,
): Promise<ContractInstance> => {
  if (contractAddress) {
    return <ContractInstance>(
      await getTruffleContract(artifacts, contractId).at(contractAddress)
    )
  } else {
    return <ContractInstance>(
      await getTruffleContract(artifacts, contractId).deployed()
    )
  }
}

export const deployContractTruffle = async <Contract, ContractInstance>(
  artifacts: Truffle.Artifacts,
  deployer: Truffle.Deployer,
  contractId: ContractId | LibraryId,
  args?: any[],
): Promise<ContractInstance> => {
  const contract = getTruffleContract<Contract>(artifacts, contractId)
  if (args) {
    await deployer.deploy(contract, ...args)
  } else {
    await deployer.deploy(contract)
  }
  // TODO: review this, smells bad
  return <ContractInstance>(<any>await contract.deployed())
}

export const linkLibraryToContractTruffle = async <Library, Contract>(
  artifacts: Truffle.Artifacts,
  deployer: Truffle.Deployer,
  libraryId: LibraryId,
  contractId: ContractId | LibraryId,
) => {
  const library = getTruffleContract<Library>(artifacts, libraryId)
  const contract = getTruffleContract<Contract>(artifacts, contractId)
  await deployer.link(library, contract)
}
