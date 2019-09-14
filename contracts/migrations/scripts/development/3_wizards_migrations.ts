import {migrationHandler} from "../../utils/migration-handler"
import {
  getPathDeployedWizardsContracts,
  IWizardsAddresses,
} from "../../../server/configuration"
import {writeObjectToFile} from "../../../utils/common-utils"

export const deployDAOMigration = migrationHandler(
  "Deploy the initial Coven",
  artifacts,
  async ({
    accounts,
    deployWizardGuild,
    deployWizardsERC721AddressesProvider,
    deployWizardWalletFactory,
    deployWizardWallet,
    network,
  }) => {
    const wizardGuild = await deployWizardGuild()
    await wizardGuild.openSeries(accounts[0], 5974)
    await wizardGuild.mintWizards([50, 75, 100, 100], [1, 2, 3, 2], accounts[0])
    const wizardsERC721AddressesProvider = await deployWizardsERC721AddressesProvider(
      [wizardGuild.address],
    )
    const wizardWalletFactory = await deployWizardWalletFactory([
      wizardsERC721AddressesProvider.address,
    ])
    await wizardWalletFactory.createWallet(5975)
    await wizardWalletFactory.createWallet(5976)
    await wizardWalletFactory.createWallet(5977)

    const deployedWizardsContracts: IWizardsAddresses = {
      WizardGuild: wizardGuild.address,
      WizardsERC721AddressesProvider: wizardsERC721AddressesProvider.address,
      WizardWalletFactory: wizardWalletFactory.address,
    }

    // Persistence in a json file of the addresses of contracts deployed by other contracts
    await writeObjectToFile(
      getPathDeployedWizardsContracts(network),
      deployedWizardsContracts,
    )
  },
)

module.exports = deployDAOMigration
