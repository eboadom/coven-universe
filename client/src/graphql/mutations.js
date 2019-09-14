import gql from "graphql-tag";

export const createProposalMutation = gql`
  mutation CreateProposal($data: ReputationProposalInput!) {
    createProposalForReputationReward(data: $data) {
      from
      to
      data
      gas
      value
    }
  }
`;

export const voteOnProposalMutation = gql`
  mutation VoteOnProposal($data: VoteProposalInput!) {
    voteProposal(data: $data) {
      from
      to
      data
      gas
      value
    }
  }
`;

export const createWalletForWizard = gql`
  mutation CreateWalletForWizard($data: CreateWizardWalletInput!) {
    createWalletForWizard(data: $data) {
      from
      to
      data
      gas
      value
    }
  }
`;

export const redeemReputation = gql`
  mutation RedeemReputation($data: RedeemReputationInput!) {
    redeemReputation(data: $data) {
      from
      to
      data
      gas
      value
    }
  }
`;
