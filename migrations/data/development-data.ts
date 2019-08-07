import BigNumber from "bignumber.js"

export const DAOName = "CheezeWizardsDAO"
export const TokenDAOName = "Cheeze Wizards DAO Token"
export const TokenDAOSymbol = "CWDAO"
export const defaultInitialReputation = new BigNumber(10).multipliedBy(
  new BigNumber(10).exponentiatedBy(18),
) // 10 Reputation
export const defaultInitialTokens = new BigNumber(100).multipliedBy(
  new BigNumber(10).exponentiatedBy(18),
) // 100 native DAO tokens
export const TokenDAOCap = new BigNumber(0) // No cap
export const absoluteVoteRequiredThreshold = 50 // In %. Proposal approved/rejected once this percentage bar is crossed by one option
export const quorumVoteRequiredThreshold = 30 // In %. At least this % of the total reputation of the DAO voted
export const ethereumNullAddress = "0x0000000000000000000000000000000000000000"
export const tempContractAddressesPath = "migrations/data/temp-contract-addresses.json";
