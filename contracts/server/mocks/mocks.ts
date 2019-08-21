import {
  CowvenData,
  GrateTypes,
  GrateData,
  WizardBasicData,
  WizardType,
  WizardStatus,
} from "../api-types/api-types"

export const mockCowvenName = "CheezeDAO"
export const mockOwnerAddress = "0x35d3d4353d78c80bdc5A2824EEd1920748769d54"

export const mockCowven: CowvenData = {
  id: mockCowvenName,
  description: "Just another cheezy cowven",
  rank: 1,
  score: 3000,
  members: 4,
  wins: 0,
  loses: 0,
  grate: GrateTypes.BALANCE,
}

export const mockGrate: GrateData = {
  id: GrateTypes.BALANCE,
  score: 5000,
}

export const mockWizard: WizardBasicData = {
  id: 1,
  owner: mockOwnerAddress,
  type: WizardType.FIRE,
  score: 3000,
  cowven: mockCowvenName,
  status: WizardStatus.IN_COWVEN,
  reputation: 4000,
}
