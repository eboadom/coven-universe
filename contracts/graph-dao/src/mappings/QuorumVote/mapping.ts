import {
  Address,
  BigInt,
  ByteArray,
  Bytes,
  crypto,
  EthereumValue,
  store,
} from "@graphprotocol/graph-ts"

import {
  ExecuteProposal,
  QuorumVote,
  NewProposal,
  VoteProposal,
} from "../../types/QuorumVote/QuorumVote"

import {concat, eventId} from "../../utils"

import {
  QuorumVoteExecuteProposal,
  QuorumVoteProposal,
  QuorumVoteVote,
} from "../../types/schema"

import * as domain from "../../domain"

export function handleNewProposal(event: NewProposal): void {
  let ent = new QuorumVoteProposal(event.params._proposalId.toHex())
  ent.proposalId = event.params._proposalId
  ent.submittedTime = event.block.timestamp
  ent.proposer = event.params._proposer
  ent.daoAvatarAddress = event.params._organization
  ent.numOfChoices = event.params._numOfChoices
  ent.address = event.address
  ent.paramsHash = event.params._paramsHash
  store.set("QuorumVoteProposal", ent.id, ent)
}

export function handleVoteProposal(event: VoteProposal): void {
  domain.handleVoteProposal(event)
  let uniqueId = concat(event.params._proposalId, event.params._voter).toHex()
  let ent = new QuorumVoteVote(uniqueId)

  let vote = store.get("QuorumVoteVote", uniqueId) as QuorumVoteVote
  if (vote == null) {
    ent.avatarAddress = event.params._organization
    ent.reputation = event.params._reputation
    ent.voterAddress = event.params._voter
    ent.voteOption = event.params._vote
    ent.proposalId = event.params._proposalId.toHex()
  } else {
    // Is it possible someone will use 50% for one voteOption and rest for the other
    vote.reputation = vote.reputation.plus(event.params._reputation)
    store.set("QuorumVoteVote", uniqueId, vote)
    return
  }

  store.set("QuorumVoteVote", uniqueId, ent)
}

export function handleExecuteProposal(event: ExecuteProposal): void {
  domain.handleExecuteProposal(event)

  let proposal = store.get(
    "QuorumVoteProposal",
    event.params._proposalId.toHex(),
  ) as QuorumVoteProposal

  proposal.executionTime = event.block.timestamp
  proposal.decision = event.params._decision
  proposal.totalReputation = event.params._totalReputation
  // todo:figure out why reading uint8 param does not work .
  // for now use a workaround.
  // https://github.com/graphprotocol/graph-node/issues/569
  proposal.state = state(event.params._proposalId, event.address).toI32()
  store.set("QuorumVoteProposal", event.params._proposalId.toHex(), proposal)

  let quorumVoteExecuteProposal = new QuorumVoteExecuteProposal(
    eventId(event),
  )
  quorumVoteExecuteProposal.decision = event.params._decision
  quorumVoteExecuteProposal.contract = event.address
  quorumVoteExecuteProposal.organization = event.params._organization
  quorumVoteExecuteProposal.proposalId = event.params._proposalId
  quorumVoteExecuteProposal.totalReputation = event.params._totalReputation
  quorumVoteExecuteProposal.txHash = event.transaction.hash
  store.set(
    "QuorumVoteExecuteProposal",
    quorumVoteExecuteProposal.id,
    quorumVoteExecuteProposal,
  )
}

function state(proposalId: Bytes, address: Address): BigInt {
  let quorumVote = QuorumVote.bind(address)
  let result = quorumVote.call("state", [
    EthereumValue.fromFixedBytes(proposalId),
  ])
  return result[0].toBigInt()
}
