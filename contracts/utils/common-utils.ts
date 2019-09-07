import BigNumber from "bignumber.js"
import BN from "bn.js"
import {EthereumNetwork} from "./types"
import {promises} from "fs"
import {exec as callbackExec, spawn as spawnNode} from "child_process"

export const ADDRESS_0x0 = "0x0000000000000000000000000000000000000000"

export const getHttpProviderUrlByNetwork = (
  network: EthereumNetwork,
): string | undefined => {
  try {
    return selectUrlEthereumProviderByNetwork(
      network,
      process.env.GANACHE_URL,
      process.env.URL_ETHEREUM_HTTP_PROVIDER,
    )
  } catch (error) {
    throw new Error(`Errow. Getting HTTP provider, invalid network ${network}`)
  }
}

export const getWSProviderUrlByNetwork = (
  network: EthereumNetwork,
): string | undefined => {
  try {
    return selectUrlEthereumProviderByNetwork(
      network,
      process.env.GANACHE_URL,
      process.env.URL_ETHEREUM_WS_PROVIDER,
    )
  } catch (error) {
    throw new Error(`Errow. Getting WS provider, invalid network ${network}`)
  }
}

const selectUrlEthereumProviderByNetwork = (
  network: EthereumNetwork,
  ganacheUrl: string | undefined,
  ethereumProviderUrl: string | undefined,
) => {
  switch (network) {
    case EthereumNetwork.development:
      return ganacheUrl
    // Mainnet deployment will be done manually, changing
    // the ethereumProviderUrl to one of mainnet
    case EthereumNetwork.kovan:
    case EthereumNetwork.main:
      return ethereumProviderUrl
    default:
      throw new Error()
  }
}

export const writeObjectToFile = async (path: string, obj: object) =>
  await promises.writeFile(path, JSON.stringify(obj))

export const writeTextToFile = async (path: string, text: string) =>
  await promises.writeFile(path, text)

export const spawn = (command: string[]) => {
  return new Promise((resolve, reject) => {
    const child = spawnNode(command[0], command.slice(1), {shell: true})

    child.stdout.on("data", data => {
      console.log("stdout: " + data.toString())
    })

    child.stderr.on("data", data => {
      console.log("stderr: " + data.toString())
    })

    child.on("exit", (code: number) => {
      if (code !== 0) {
        console.log(`child process exited correctly with code ${code}`)
      }

      resolve()
    })
  })
}

export const exec = (command: string) =>
  new Promise((resolve, reject) => {
    callbackExec(command, (error, stdout, stderr) => {
      if (error) return reject(error)
      resolve({out: stdout, err: stderr})
    })
  })

export const currencyUnitsToDecimals = (
  value: BigNumber,
  decimals: number,
): tStringDecimalUnits =>
  new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals)).toFixed()

export const decimalsToCurrencyUnits = (
  value: BigNumber,
  decimals: number,
): tStringCurrencyUnits =>
  new BigNumber(value).div(new BigNumber(10).pow(decimals)).toFixed()

// TODO: review types
export const bnToBigNumber = (amount: BN): BigNumber =>
  new BigNumber(<any>amount)
export const stringToBigNumber = (amount: string): BigNumber =>
  new BigNumber(amount)

export type tStringCurrencyUnits = string // ex. 2.5
export type tStringDecimalUnits = string // ex 2500000000000000000
export type tBigNumberCurrencyUnits = BigNumber
export type tBigNumberDecimalUnits = BigNumber
