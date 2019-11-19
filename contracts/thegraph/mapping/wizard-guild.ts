import {
  Transfer,
  WizardAffinityAssigned,
  WizardConjured,
} from "../generated/WizardGuild/WizardGuild"
import {loadOrInitPlayer, loadOrInitWizard} from "../helpers/initializers"

export function handleWizardConjured(event: WizardConjured): void {
  let wizard = loadOrInitWizard(event.params.wizardId.toHexString())
  wizard.affinity = event.params.affinity
  wizard.innatePower = event.params.innatePower
  wizard.save()
}

export function handleWizardAffinityAssigned(
  event: WizardAffinityAssigned,
): void {
  let wizard = loadOrInitWizard(event.params.wizardId.toHexString())
  wizard.affinity = event.params.affinity
  wizard.save()
}

export function handleTransfer(event: Transfer): void {
  let playerTo = loadOrInitPlayer(event.params.to)
  let wizard = loadOrInitWizard(event.params.wizardId.toHexString())
  let playerToWizards = playerTo.wizards
  playerToWizards.push(wizard.id)
  playerTo.wizards = playerToWizards
  playerTo.save()
  if (event.address !== event.params.from) {
    let playerFrom = loadOrInitPlayer(event.params.to)
    // TODO: should be tested
    playerFrom.wizards = playerFrom.wizards.filter(id => id !== wizard.id)
    playerFrom.save()
  }
}
