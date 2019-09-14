import {migrationHandler} from "../../utils/migration-handler"
import {
  getPathDeployedWizardsContracts,
  IWizardsAddresses,
} from "../../../server/configuration"
import {writeObjectToFile} from "../../../utils/common-utils"
import { rinkebyOwnerOfMockWizards } from "../../data/development-data"

export const deployDAOMigration = migrationHandler(
  "Deploy the initial Coven",
  artifacts,
  async ({
    accounts,
    deployWizardGuild,
    deployWizardsERC721AddressesProvider,
    deployWizardWalletFactory,
    network,
  }) => {
    const wizardGuild = await deployWizardGuild()
    await wizardGuild.openSeries(accounts[0], 5974)
    await wizardGuild.mintWizards([50, 75, 100, 100, 200, 300, 500], [1, 2, 3, 2, 0, 0,1], rinkebyOwnerOfMockWizards)
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
