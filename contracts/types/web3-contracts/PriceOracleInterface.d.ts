/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import {Contract, ContractOptions, EventOptions} from "web3-eth-contract";
import {EventLog} from "web3-core";
import {EventEmitter} from "events";
import {Callback, TransactionObject, ContractEvent} from "./types";

export class PriceOracleInterface extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  methods: {
    getPrice(
      token: string
    ): TransactionObject<{
      0: BN;
      1: BN;
    }>;
  };
  events: {
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}