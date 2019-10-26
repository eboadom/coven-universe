import {migrationHandler} from "../../utils/migration-handler"
import {
  getPathDeployedWizardsContracts,
  IWizardsAddresses,
} from "../../../server/configuration"
import {writeObjectToFile} from "../../../utils/common-utils"

export const deployTestWizardsMigration = migrationHandler(
  "Deploy the test wizards",
  artifacts,
  async ({
    accounts,
    deployWizardGuild,
    deployWizardsERC721AddressesProvider,
    deployWizardWalletFactory,
    network,
  }) => {
    const seriesMinter = accounts[0]
    const reservedWizardsCount = 5974
    const initialOwner = accounts[0]
    const wizardIds = [5975, 5976, 5977]

    const wizardGuild = await deployWizardGuild()
    await wizardGuild.openSeries(seriesMinter, reservedWizardsCount)
    await wizardGuild.mintWizards(
      [50, 75, 100, 100],
      [1, 2, 3, 2],
      initialOwner,
    )
    const wizardsERC721AddressesProvider = await deployWizardsERC721AddressesProvider(
      [wizardGuild.address],
    )
    const wizardWalletFactory = await deployWizardWalletFactory([
      wizardsERC721AddressesProvider.address,
    ])
    for (const id of wizardIds) {
      await wizardWalletFactory.createWallet(id)
    }

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

module.exports = deployTestWizardsMigration
