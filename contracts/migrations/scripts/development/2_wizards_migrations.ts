import {migrationHandler} from "../../utils/migration-handler"
import {
  getPathDeployedWizardsContracts,
  IWizardsAddresses,
} from "../../../server/configuration"
import {writeObjectToFile} from "../../../utils/common-utils"
import {cheezeWizardsId} from "../../data/development-data"
import {ethers} from "ethers"

export const deployTestWizardsMigration = migrationHandler(
  "Deploy the test wizards",
  artifacts,
  async ({
    accounts,
    deployWizardGuild,
    deployAssetsRegistriesRegistry,
    deployAssetWalletFactory,
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
    const assetsRegistriesRegistry = await deployAssetsRegistriesRegistry([
      wizardGuild.address,
    ])
    await assetsRegistriesRegistry.setAssetsRegistryAddress(
      ethers.utils.keccak256(cheezeWizardsId),
      wizardGuild.address,
    )
    const assetWalletFactory = await deployAssetWalletFactory([
      assetsRegistriesRegistry.address,
      ethers.utils.keccak256(cheezeWizardsId),
    ])
    for (const id of wizardIds) {
      await assetWalletFactory.createWallet(id)
    }

    const deployedWizardsContracts: IWizardsAddresses = {
      WizardGuild: wizardGuild.address,
      AssetsRegistriesRegistry: assetsRegistriesRegistry.address,
      AssetWalletFactory: assetsRegistriesRegistry.address,
    }

    // Persistence in a json file of the addresses of contracts deployed by other contracts
    await writeObjectToFile(
      getPathDeployedWizardsContracts(network),
      deployedWizardsContracts,
    )
  },
)

module.exports = deployTestWizardsMigration
