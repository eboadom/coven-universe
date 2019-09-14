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
                cowvenName
                cowvenAddress
                status
                wizardWalletData {
                    wizardWalletAddress
                    genecheezeDaoReputation
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
          cowvenName
          cowvenAddress
          status
          wizardWalletData {
              wizardWalletAddress
              genecheezeDaoReputation
          }
      }
  }
`;

