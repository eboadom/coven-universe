/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import {Contract, ContractOptions, EventOptions} from "web3-eth-contract";
import {EventLog} from "web3-core";
import {EventEmitter} from "events";
import {Callback, TransactionObject, ContractEvent} from "./types";

export class Avatar extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  methods: {
    renounceOwnership(): TransactionObject<void>;

    transferOwnership(newOwner: string): TransactionObject<void>;

    genericCall(
      _contract: string,
      _data: string | number[],
      _value: number | string
    ): TransactionObject<{
      success: boolean;
      returnValue: string;
      0: boolean;
      1: string;
    }>;

    sendEther(
      _amountInWei: number | string,
      _to: string
    ): TransactionObject<boolean>;

    externalTokenTransfer(
      _externalToken: string,
      _to: string,
      _value: number | string
    ): TransactionObject<boolean>;

    externalTokenTransferFrom(
      _externalToken: string,
      _from: string,
      _to: string,
      _value: number | string
    ): TransactionObject<boolean>;

    externalTokenApproval(
      _externalToken: string,
      _spender: string,
      _value: number | string
    ): TransactionObject<boolean>;

    metaData(_metaData: string): TransactionObject<boolean>;

    orgName(): TransactionObject<string>;
    nativeReputation(): TransactionObject<string>;
    owner(): TransactionObject<string>;
    isOwner(): TransactionObject<boolean>;
    nativeToken(): TransactionObject<string>;
  };
  events: {
    GenericCall: ContractEvent<{
      _contract: string;
      _data: string;
      _value: BN;
      _success: boolean;
      0: string;
      1: string;
      2: BN;
      3: boolean;
    }>;
    SendEther: ContractEvent<{
      _amountInWei: BN;
      _to: string;
      0: BN;
      1: string;
    }>;
    ExternalTokenTransfer: ContractEvent<{
      _externalToken: string;
      _to: string;
      _value: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    ExternalTokenTransferFrom: ContractEvent<{
      _externalToken: string;
      _from: string;
      _to: string;
      _value: BN;
      0: string;
      1: string;
      2: string;
      3: BN;
    }>;
    ExternalTokenApproval: ContractEvent<{
      _externalToken: string;
      _spender: string;
      _value: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    ReceiveEther: ContractEvent<{
      _sender: string;
      _value: BN;
      0: string;
      1: BN;
    }>;
    MetaData: ContractEvent<string>;
    OwnershipTransferred: ContractEvent<{
      previousOwner: string;
      newOwner: string;
      0: string;
      1: string;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}