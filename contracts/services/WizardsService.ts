import {
  ContractService,
  EWeb3ProviderType,
  IEthereumTransactionModel,
} from "./ContractService"
import {tEthereumAddress, getConfiguration} from "../server/configuration"
import {WizardGuild} from "../types/web3-contracts/WizardGuild"
import {bnToBigNumber, ADDRESS_0x0} from "../utils/common-utils"
import {WizardWalletFactory} from "../types/web3-contracts/WizardWalletFactory"
import {WizardWallet} from "../types/web3-contracts/WizardWallet"
import {path as rootPath} from "app-root-path"
import {DaoService, IMembersDaoWithReputation} from "./DaoService"
import {DAOName} from "../migrations/data/development-data"
import {EventData} from "web3-eth-contract"

export enum eWizardStatus {
  IN_COWVEN = "IN_COWVEN",
  FREE = "FREE",
}

export enum eWizardAffinity {
  Fire = "Fire",
  Wind = "Wind",
  Water = "Water",
  Neutral = "Neutral",
}

export enum eWizardGuildEvent {
  Transfer = "Transfer",
}

export enum eWizardWalletFactoryEvent {
  WizardWalletCreated = "WizardWalletCreated",
}

export const wizardAffinities = [
  eWizardAffinity.Neutral,
  eWizardAffinity.Fire,
  eWizardAffinity.Water,
  eWizardAffinity.Wind,
];

export interface IWizardData {
  id: number
  owner: tEthereumAddress
  innatePower: string
  affinity: string
  score?: string
  cowvenName?: string
  cowvenAddress?: tEthereumAddress
  status: eWizardStatus
  wizardWalletData: IWizardWalletData
}

export interface IWizardWalletData {
  wizardWalletAddress: tEthereumAddress
  genecheezeDaoReputation: string
}

export interface IWizardIdWithWallet {
  wizardId: string
  wizardWallet: tEthereumAddress
}

export interface IWizardWalletDaoWithReputation
  extends IMembersDaoWithReputation {
  wizardId: string
}

export interface IWizardsService {
  // Info getters
  getAllTransferEventsOfWizards: () => Promise<EventData[]>
  getAllTransferEventsByWizardId: (wizardId: string) => Promise<EventData[]>
  getCurrentOwnerOfWizardId: (wizardId: string) => Promise<tEthereumAddress>
  getAllWizardsByOwnerAddress: (owner: tEthereumAddress) => Promise<string[]>
  getWizardsDataByOwner: (owner: tEthereumAddress) => Promise<IWizardData[]>
  getWizardData: (wizardId: number) => Promise<IWizardData>
  getWizardWalletAddressByWizardId: (
    wizardId: number,
  ) => Promise<tEthereumAddress>
  // Tx builders
  createWalletForWizard: (
    userWallet: tEthereumAddress,
    wizardId: number,
  ) => Promise<IEthereumTransactionModel>
}

// Allows to interact with the Wizards-related part: wizards nft, CheezeWizards tournaments, Wizards wallets
export class WizardsService extends ContractService {
  private getWizardGuildABI = (): any[] =>
    require(`${rootPath}/build/contracts/WizardGuild.json`).abi;

  private getWizardWalletABI = (): any[] =>
    require(`${rootPath}/build/contracts/WizardWallet.json`).abi;

  private getWizardWalletFactoryABI = (): any[] =>
    require(`${rootPath}/build/contracts/WizardWalletFactory.json`).abi;

  private getWizardGuildAddress = (): tEthereumAddress =>
    getConfiguration().addresses.WizardGuild;

  private getWizardWalletFactoryAddress = (): tEthereumAddress =>
    getConfiguration().addresses.WizardWalletFactory;

  private getWizardsERC721AddressesProviderAddress = (): tEthereumAddress =>
    getConfiguration().addresses.WizardsERC721AddressesProvider;

  private getWizardGuildContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<WizardGuild>(
      web3ProviderType,
      this.getWizardGuildABI(),
      this.getWizardGuildAddress(),
    );

  private getWizardWalletFactoryContract = (
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<WizardWalletFactory>(
      web3ProviderType,
      this.getWizardWalletFactoryABI(),
      this.getWizardWalletFactoryAddress(),
    );

  private getWizardWalletContract = (
    wizardWalletAddress: tEthereumAddress,
    web3ProviderType: EWeb3ProviderType = EWeb3ProviderType.HTTP,
  ) =>
    this.getContractByWeb3ProviderType<WizardWallet>(
      web3ProviderType,
      this.getWizardWalletABI(),
      wizardWalletAddress,
    );

  getAllWizardWalletsCreated = async (): Promise<IWizardIdWithWallet[]> =>
    (await this.getWizardWalletFactoryContract().getPastEvents(
      eWizardWalletFactoryEvent.WizardWalletCreated,
      {fromBlock: 0},
    )).map(eventData => ({
      wizardId: bnToBigNumber(eventData.returnValues.wizardId).toFixed(),
      wizardWallet: eventData.returnValues.wizardWallet,
    }))

  getAllTransferEventsOfWizards = async (): Promise<EventData[]> =>
    await this.getWizardGuildContract().getPastEvents(
      eWizardGuildEvent.Transfer,
      {fromBlock: 0},
    );

  getAllTransferEventsByWizardId = async (
    wizardId: string,
  ): Promise<EventData[]> =>
    (await this.getWizardGuildContract().getPastEvents(
      eWizardGuildEvent.Transfer,
      {fromBlock: 0},
    )).filter(
      eventData =>
        bnToBigNumber(eventData.returnValues.wizardId).toFixed() === wizardId,
    );

  getCurrentOwnerOfWizardId = async (
    wizardId: string,
  ): Promise<tEthereumAddress> => {
    const allWizardTransfers = await this.getAllTransferEventsByWizardId(
      wizardId,
    );
    return allWizardTransfers[allWizardTransfers.length - 1].returnValues.to
  };

  getAllWizardsByOwnerAddress = async (
    owner: tEthereumAddress,
  ): Promise<string[]> => {
    return (await this.getAllTransferEventsOfWizards())
      .filter(eventData => eventData.returnValues.to === owner)
      .map(eventData => eventData.returnValues.wizardId.toString())
  };

  getWizardsDataByOwner = async (
    owner: tEthereumAddress,
  ): Promise<IWizardData[]> => {
    const allWizardsOwned = await this.getAllWizardsByOwnerAddress(owner);
    const wizardsData: IWizardData[] = [];
    for (const wizardId of allWizardsOwned) {
      wizardsData.push(await this.getWizardData(Number(wizardId)))
    }
    return wizardsData
  };

  getWizardData = async (wizardId: number): Promise<IWizardData> => {
    const {getWizard} = this.getWizardGuildContract().methods;
    const daoService = new DaoService();
    const [
      {owner, innatePower, affinity, metadata},
      wizardWalletAddress,
    ] = await Promise.all([
      getWizard(wizardId).call(),
      this.getWizardWalletAddressByWizardId(wizardId),
    ]);

    const reputation =
      wizardWalletAddress !== ADDRESS_0x0
        ? await daoService.getReputationBalanceOf(wizardWalletAddress)
        : "0";
    const status =
      reputation !== "0" ? eWizardStatus.IN_COWVEN : eWizardStatus.FREE;

    return {
      id: wizardId,
      owner,
      innatePower: bnToBigNumber(innatePower).toString(),
      affinity: wizardAffinities[bnToBigNumber(affinity).toNumber()],
      status: status,
      wizardWalletData: {
        wizardWalletAddress: wizardWalletAddress,
        genecheezeDaoReputation: reputation,
      },
      cowvenName: DAOName, // TODO: adapt to multi daos
      cowvenAddress: daoService.getAvatarAddress(), // TODO: adapt to multidaos
    }
  };

  getWizardWalletAddressByWizardId = async (
    wizardId: number,
  ): Promise<tEthereumAddress> =>
    await this.getWizardWalletFactoryContract()
      .methods.wizardsWallets(wizardId)
      .call();

  createWalletForWizard = async (
    userWallet: tEthereumAddress,
    wizardId: number,
  ): Promise<IEthereumTransactionModel> =>
    await this.txTo(this.getWizardWalletFactoryAddress(), {
      from: userWallet,
      data: this.getWizardWalletFactoryContract()
        .methods.createWallet(wizardId)
        .encodeABI(),
    })
}
