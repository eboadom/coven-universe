import {BigInt} from "@graphprotocol/graph-ts/index"
import {store} from "@graphprotocol/graph-ts"

import {
  CancelVoting,
  VoteProposal,
} from "../generated/templates/QuorumVote/QuorumVote"
import {
  loadOrInitProposal,
  loadOrInitProposalVote,
  loadOrInitWizardWallet,
} from "../helpers/initializers"

const ABSTAIN = BigInt.fromI32(0)
const YES = BigInt.fromI32(1)
const NO = BigInt.fromI32(2)

export function handleVoteProposal(event: VoteProposal): void {
  let proposal = loadOrInitProposal(
    event.params._organization, // TODO: CHECK
    event.params._proposalId.toHexString(),
  )
  let voter = loadOrInitWizardWallet(event.params._voter)

  let proposalVote = loadOrInitProposalVote(proposal.id, voter.id)
  proposalVote.agreed = event.params._vote.equals(YES)
  proposalVote.reputation = event.params._reputation
  proposalVote.createdAtTimestamp = event.block.timestamp
  proposalVote.save()

  // TODO: SHOULD WE SUPPORT ABSTAIN OR NOT?
  if (event.params._vote.equals(YES)) {
    proposal.reputationPro = proposal.reputationPro.plus(
      proposalVote.reputation,
    )
    proposal.votesPro = proposal.votesPro.plus(BigInt.fromI32(1))
  } else if (event.params._vote.equals(NO)) {
    proposal.reputationContra = proposal.reputationContra.plus(
      proposalVote.reputation,
    )
    proposal.votesContra = proposal.votesContra.plus(BigInt.fromI32(1))
  }
  let proposalVotes = proposal.votes
  proposalVotes.push(proposalVote.id)
  proposal.votes = proposalVotes
  proposal.save()

  let voterVotes = voter.votes
  voterVotes.push(proposalVote.id)
  voter.votes = voterVotes
  voter.save()
}

export function handleCancelVoting(event: CancelVoting): void {
  let proposal = loadOrInitProposal(
    event.params._organization, // TODO: CHECK, is it Avatar or not
    event.params._proposalId.toHexString(),
  )
  let voter = loadOrInitWizardWallet(event.params._voter)
  let vote = loadOrInitProposalVote(proposal.id, voter.id)
  voter.votes = voter.votes.filter(id => id !== vote.id)
  voter.save()

  // TODO: SHOULD WE SUPPORT ABSTAIN OR NOT?
  proposal.votes = proposal.votes.filter(id => id !== vote.id)
  if (vote.agreed) {
    proposal.reputationPro = proposal.reputationPro.minus(vote.reputation)
    proposal.votesPro = proposal.votesPro.minus(BigInt.fromI32(1))
  } else {
    proposal.reputationContra = proposal.reputationContra.minus(vote.reputation)
    proposal.votesContra = proposal.votesContra.minus(BigInt.fromI32(1))
  }
  proposal.save()
  store.remove("ProposalVote", vote.id)
}
