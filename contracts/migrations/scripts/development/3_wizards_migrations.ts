import {migrationHandler} from "../../utils/migration-handler"
import IWizardsAddresses, {
  initConfiguration,
  getPathDeployedWizardsContracts,
} from "../../../server/configuration"
import {writeObjectToFile} from "../../../utils/common-utils"
import {WizardsService} from "../../../services/WizardsService"

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
    await wizardGuild.mintWizards([50, 75, 100], [1, 2, 3], accounts[0])
    const nextWizardIndex = await wizardGuild.getNextWizardIndex()
    const wizardsERC721AddressesProvider = await deployWizardsERC721AddressesProvider(
      [wizardGuild.address],
    )
    // console.log(await wizardsERC721AddressesProvider.wizardsERC721Address())
    const wizardWalletFactory = await deployWizardWalletFactory([
      wizardsERC721AddressesProvider.address,
    ])
    // console.log((await wizardWalletFactory.createWallet(5975)).receipt.gasUsed)
    // console.log(await wizardWalletFactory.wizardsWallets(5975))

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

    await initConfiguration()
    const wizardsService = new WizardsService()
    console.log(await wizardsService.getWizardData(5975))
    console.log(await wizardsService.getWizardData(5976))
    console.log(await wizardsService.getWizardData(5977))
  },
)

module.exports = deployDAOMigration
