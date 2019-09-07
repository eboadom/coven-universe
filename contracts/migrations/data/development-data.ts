import BigNumber from "bignumber.js"

export const DAOName = "GenecheezeDAO"
export const TokenDAOName = "Genecheeze DAO Token"
export const TokenDAOSymbol = "GCDAO"
export const devFundReputation = new BigNumber(100000)
  .multipliedBy(new BigNumber(10).exponentiatedBy(18))
  .toFixed() // 10 000 Reputation
export const devFundTokens = new BigNumber(10000)
  .multipliedBy(new BigNumber(10).exponentiatedBy(18))
  .toFixed() // 10 000 GCDAO
export const TokenDAOCap = new BigNumber(100000)
  .multipliedBy(new BigNumber(10).exponentiatedBy(18))
  .toFixed() // 1 000 000 GCDAO
export const absoluteVoteRequiredThreshold = 50 // In %. Proposal approved/rejected once this percentage bar is crossed by one option
export const quorumVoteRequiredThreshold = 30 // In %. At least this % of the total reputation of the DAO voted
