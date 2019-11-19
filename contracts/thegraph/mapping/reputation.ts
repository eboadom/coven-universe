import {Burn, Mint} from "../generated/templates/Reputation/Reputation"
import {
  loadOrInitReputation,
  loadOrInitWizardCowvenReputation,
  loadOrInitWizardWallet,
} from "../helpers/initializers"

export function handleMint(event: Mint): void {
  let reputation = loadOrInitReputation(event.address)
  let wizardWallet = loadOrInitWizardWallet(event.params._to)
  let wizardWalletCowvenReputation = loadOrInitWizardCowvenReputation(
    event.params._to.toHexString(),
    event.address.toHexString(),
  )
  wizardWalletCowvenReputation.amount = wizardWalletCowvenReputation.amount.plus(
    event.params._amount,
  )
  wizardWalletCowvenReputation.save()
  if (!wizardWallet.reputation.includes(wizardWalletCowvenReputation.id)) {
    let wizardReputation = wizardWallet.reputation
    wizardReputation.push(wizardWalletCowvenReputation.id)
    wizardWallet.reputation = wizardReputation
    wizardWallet.save()
  }
  if (!reputation.wallets.includes(wizardWallet.id)) {
    let reputationReputations = reputation.wallets
    reputationReputations.push(wizardWallet.id)
    reputation.wallets = reputationReputations
    reputation.save()
  }
}
export function handleBurn(event: Burn): void {
  let wizardWalletCowvenReputation = loadOrInitWizardCowvenReputation(
    event.params._from.toHexString(),
    event.address.toHexString(),
  )
  wizardWalletCowvenReputation.amount = wizardWalletCowvenReputation.amount.plus(
    event.params._amount,
  )
  wizardWalletCowvenReputation.save()
}
