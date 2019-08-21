export enum GrateTypes {
    BALANCE = "BALANCE",
    OCEAN = "OCEAN",
    STORM = "STORM",
    FLAME = "FLAME",
  }
  
  export enum WizardType {
    FIRE = "FIRE",
    WIND = "WIND",
    WATER = "WATER",
    NEUTRAL = "NEUTRAL",
  }
  
  export interface CowvenData {
    id: string
    description: string
    rank: number
    score: number
    members: number
    wins: number
    loses: number
    grate: GrateTypes
  }
  
  export interface GrateData {
    id: GrateTypes
    score: number
  }
  
  export enum WizardStatus {
    IN_COWVEN = "IN_COWVEN",
    FREE = "FREE",
  }
  
  export interface WizardBasicData {
    id: number
    owner: string
    type: WizardType
    score: number
    cowven: string
    status: WizardStatus
    reputation: number
  }