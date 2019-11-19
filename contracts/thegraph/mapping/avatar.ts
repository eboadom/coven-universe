import {EthereumBlock} from "@graphprotocol/graph-ts"

import {
  MetaData,
  ReceiveEther,
  SendEther,
} from "../generated/templates/Avatar/Avatar"
import {loadOrInitCowven} from "../helpers/initializers"
import {Cowven} from "../generated/schema"
import {convertTokenAmountToDecimals} from "../helpers/converters"

const METADATA_SEPARATOR = "{{{"
function getGrateById(id: string): string {
  switch (id) {
    case "0":
      return "BALANCE"
    case "1":
      return "OCEAN"
    case "2":
      return "STORM"
    case "3":
      return "FLAME"
    case "4":
      return "MOLD"
    default:
      return "UNDEF"
  }
}

function saveCowven(cowven: Cowven, block: EthereumBlock): void {
  cowven.lastUpdateTimestamp = block.timestamp
  cowven.save()
}

export function handleMetadata(event: MetaData): void {
  let cowven = loadOrInitCowven(event.address)
  let metadata = event.params._metaData.split(METADATA_SEPARATOR)
  cowven.name = metadata[0] // TODO: ASK ERNESTO
  cowven.grate = getGrateById(metadata[1])
  cowven.description = metadata[2]
  saveCowven(cowven, event.block)
}
export function handleReceiveEther(event: ReceiveEther): void {
  let cowven = loadOrInitCowven(event.address)
  cowven.ethBalance = cowven.ethBalance.plus(
    convertTokenAmountToDecimals(event.params._value, 18),
  )
  saveCowven(cowven, event.block)
}
export function handleSendEther(event: SendEther): void {
  let cowven = loadOrInitCowven(event.address)
  cowven.ethBalance = cowven.ethBalance.minus(
    convertTokenAmountToDecimals(event.params._amountInWei, 18),
  )
  saveCowven(cowven, event.block)
}
