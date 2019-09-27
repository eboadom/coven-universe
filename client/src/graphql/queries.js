import gql from "graphql-tag";

export const allDaosData = gql`
  query AllDaos {
    allDaosInfo {
      avatarAddress
      description
      grate
      id
      loses
      wins
      rank
      score
      members {
        id
        owner
        innatePower
        affinity
        score
        status
        wizardWalletData {
          wizardWalletAddress
          reputationOfWalletByCowven {
            cowvenId
            cowvenAddress
            reputation
          }
        }
      }
    proposals {
      id
      type
      description
      status
      totalVotes
      yesVotes
      noVotes
      voters {
        voterAddress
        voteData {
          vote
          reputation
        }
      }
      reputationReward
      beneficiary
      wizardIdBeneficiary
      executionTime
      }
    }
  }
`;

export const allWizardsByUserAddress = gql`
  query AllWizardsByUserAddress($address: String!) {
    allWizardsDataByOwner(data: {userWallet: $address}) {
      id
      owner
      innatePower
      affinity
      score
      status
      wizardWalletData {
        wizardWalletAddress
        reputationOfWalletByCowven {
          cowvenId
          cowvenAddress
          reputation
        }
      }
    }
  }
`;

export const allWizardWalletsCreated = gql`
  query AllWizardWalletsCreated {
    allWizardWalletsCreated {
      wizardId
      wizardWallet
    }
  }
`;
