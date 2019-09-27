import BigNumber from "bignumber.js"
import BN from "bn.js"
import {promises} from "fs"
import {exec as callbackExec, spawn as spawnNode} from "child_process"

export const ADDRESS_0x0 = "0x0000000000000000000000000000000000000000"

export const timeBenchmark = async (f: Function): Promise<void> => {
  const NS_PER_SEC = 1e9
  const initTime = process.hrtime()
  const result = await f()
  const diff = process.hrtime(initTime)
  console.log(
    `Benchmark took ${(diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC} seconds`,
  )
}

// Returns a random number between min (inclusive) and max (exclusive)
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
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

export const getKeyByValue = (object: {[key: string]: any}, value: any) =>
  Object.keys(object).find(key => object[key] === value)

export type tStringCurrencyUnits = string // ex. 2.5
export type tStringDecimalUnits = string // ex 2500000000000000000
export type tBigNumberCurrencyUnits = BigNumber
export type tBigNumberDecimalUnits = BigNumber
