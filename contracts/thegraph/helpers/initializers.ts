import {
  Cowven,
  Player,
  Proposal,
  ProposalVote,
  Reputation,
  Wizard,
  WizardCowvenReputation,
  WizardWallet,
} from "../generated/schema"
import {Address, Bytes} from "@graphprotocol/graph-ts"
import {zeroBD, zeroBI} from "./converters"

export function loadOrInitCowven(id: Address): Cowven {
  let cowven = Cowven.load(id.toHexString())
  if (!cowven) {
    cowven = new Cowven(id.toHexString())
    cowven.name = ""
    cowven.description = ""
    cowven.grate = ""
    cowven.reputationAddress = new Bytes(1)
    cowven.tokenAddress = new Bytes(1)
    cowven.ethBalance = zeroBD()
    cowven.proposals = []
  }
  return cowven
}

export function loadOrInitReputation(id: Address): Reputation {
  let player = Reputation.load(id.toHexString())
  if (!player) {
    player = new Reputation(id.toHexString())
    player.totalReputationSupply = zeroBI()
  }
  return player
}

export function loadOrInitPlayer(id: Address): Player {
  let player = Player.load(id.toHexString())
  if (!player) {
    player = new Player(id.toHexString())
    player.wizards = []
  }
  return player
}
export function loadOrInitWizard(id: string): Wizard {
  let wizard = Wizard.load(id)
  if (!wizard) {
    wizard = new Wizard(id)
    wizard.player = ""
    wizard.affinity = 0
    wizard.innatePower = zeroBI()
    wizard.loses = 0
    wizard.wins = 0
    wizard.wallet = ""
  }
  return wizard
}
export function loadOrInitWizardWallet(id: Address): WizardWallet {
  let wizardWallet = WizardWallet.load(id.toHexString())
  if (!wizardWallet) {
    wizardWallet = new WizardWallet(id.toHexString())
    wizardWallet.proposals = []
    wizardWallet.votes = []
    wizardWallet.reputation = []
  }
  return wizardWallet
}
export function loadOrInitWizardCowvenReputation(
  wizardWalletId: string,
  reputationId: string,
): WizardCowvenReputation {
  const id = wizardWalletId + reputationId
  let wizardCowvenReputation = WizardCowvenReputation.load(id)
  if (!wizardCowvenReputation) {
    wizardCowvenReputation = new WizardCowvenReputation(id)
    wizardCowvenReputation.amount = zeroBI()
    wizardCowvenReputation.wizardWallet = wizardWalletId
    wizardCowvenReputation.reputation = reputationId
  }
  return wizardCowvenReputation
}
export function loadOrInitProposal(
  cowven: Address,
  proposalId: string,
): Proposal {
  const id = cowven.toHexString() + proposalId
  let proposal = Proposal.load(id)
  if (!proposal) {
    proposal = new Proposal(id)
    proposal.beneficiary = ""
    proposal.cowven = ""
    proposal.createdAtTimestamp = 0
    proposal.createdAtBlock = zeroBI()
    proposal.description = ""
    proposal.isActive = true
    proposal.isRedeemed = false
    proposal.isSuccessed = false
    proposal.reputationChange = zeroBI()
    proposal.votesPro = zeroBI()
    proposal.votesContra = zeroBI()
    proposal.reputationPro = zeroBI()
    proposal.reputationContra = zeroBI()
  }
  return proposal
}

export function loadOrInitProposalVote(
  proposalId: string,
  voterId: string,
): ProposalVote {
  const id = proposalId + voterId
  let proposalVote = ProposalVote.load(id)
  if (!proposalVote) {
    proposalVote = new ProposalVote(id)
    proposalVote.agreed = false
    proposalVote.wizardWallet = voterId
    proposalVote.proposal = proposalId
    proposalVote.reputation = zeroBI()
  }
  return proposalVote
}
