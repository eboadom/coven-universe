import Web3 from "web3"

export type tEthereumAddress = string
export type tGetConfiguration = () => IConfiguration

export const getPathDeployedWizardsContracts = (ethereumNetwork: string) =>
  `migrations/data/wizards-${ethereumNetwork}-addresses.json`

export default interface IWizardsAddresses {
  WizardWalletFactory: tEthereumAddress
  WizardsERC721AddressesProvider: tEthereumAddress
  WizardGuild: tEthereumAddress
}

export interface IConfiguration {
  network: string
  web3: Web3
  web3WS: Web3
  addresses: IWizardsAddresses
}

export let configuration: IConfiguration

export const initConfiguration = async (ethereumNetwork: string = "kovan") => {
  const httpProvider = new Web3.providers.HttpProvider(<string>(
    process.env.URL_ETHEREUM_HTTP_PROVIDER_KOVAN
  ))
  const wsProvider = new Web3.providers.WebsocketProvider(<string>(
    process.env.URL_ETHEREUM_WS_PROVIDER_KOVAN
  ))
  configuration = {
    web3: new Web3(httpProvider),
    web3WS: new Web3(wsProvider),
    addresses: <IWizardsAddresses>(
      require(getPathDeployedWizardsContracts(ethereumNetwork))
    ),
    network: <string>process.env.API_ETHEREUM_NETWORK,
  }
}

export const getConfiguration = () => {
  return configuration
}
