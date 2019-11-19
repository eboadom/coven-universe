import {AssetWalletCreated} from "../generated/templates/AssetWalletFactory/AssetWalletFactory"
import {loadOrInitWizard, loadOrInitWizardWallet} from "../helpers/initializers"

export function handleAssetWalletCreated(event: AssetWalletCreated): void {
  let wizard = loadOrInitWizard(event.params.id.toHexString())
  let wizardWallet = loadOrInitWizardWallet(event.params.wallet)
  wizardWallet.save()
  wizard.wallet = wizardWallet.id
  wizard.save()
}
