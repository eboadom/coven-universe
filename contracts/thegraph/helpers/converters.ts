import {BigInt, BigDecimal} from "@graphprotocol/graph-ts"

export function zeroBD(): BigDecimal {
  return BigDecimal.fromString("0")
}

export function zeroBI(): BigInt {
  return BigInt.fromI32(0)
}

// @ts-ignore
export function exponentToBigDecimal(decimals: i32): BigDecimal {
  let bd = BigDecimal.fromString("1")
  let bd10 = BigDecimal.fromString("10")
  for (let i = 0; i < decimals; i++) {
    bd = bd.times(bd10)
  }
  return bd
}
// @ts-ignore
export function convertTokenAmountToDecimals(amount: BigInt, decimals: i32): BigDecimal {
  return amount.toBigDecimal().div(exponentToBigDecimal(decimals))
}
