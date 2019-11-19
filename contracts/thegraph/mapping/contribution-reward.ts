import {BigInt} from "@graphprotocol/graph-ts"

import {
  NewContributionProposal,
  ProposalExecuted,
  RedeemReputation,
} from "../generated/templates/ContributionReward/ContributionReward"
import {
  loadOrInitCowven,
  loadOrInitProposal,
  loadOrInitWizardWallet,
} from "../helpers/initializers"

function handleNewContributionProposal(event: NewContributionProposal): void {
  let proposal = loadOrInitProposal(
    event.params._avatar,
    event.params._proposalId.toHexString(),
  )
  let beneficiary = loadOrInitWizardWallet(event.params._beneficiary)
  let cowven = loadOrInitCowven(event.params._avatar)

  proposal.reputationChange = event.params._reputationChange
  proposal.description = event.params._descriptionHash
  proposal.beneficiary = beneficiary.id
  proposal.cowven = cowven.id
  proposal.createdAtBlock = event.block.number
  proposal.createdAtTimestamp = event.block.timestamp
  proposal.save()

  let cowvenProposals = cowven.proposals
  cowvenProposals.push(proposal.id)
  cowven.proposals = cowvenProposals
  cowven.save()

  let beneficiaryProposals = beneficiary.proposals
  beneficiaryProposals.push(proposal.id)
  beneficiary.proposals = beneficiaryProposals
  beneficiary.save()
}

function handleProposalExecuted(event: ProposalExecuted): void {
  let proposal = loadOrInitProposal(
    event.params._avatar,
    event.params._proposalId.toHexString(),
  )
  proposal.isActive = false
  proposal.isSuccessed = event.params._param.equals(BigInt.fromI32(1))
  proposal.executedAtBlock = event.block.number
  proposal.executedAtTimestamp = event.block.timestamp
  proposal.save()
}

function handleRedeemReputation(event: RedeemReputation): void {
  let proposal = loadOrInitProposal(
    event.params._avatar,
    event.params._proposalId.toHexString(),
  )
  proposal.isRedeemed = true
  proposal.save()
}
