import {NewOrg, InitialSchemesSet} from "../generated/DaoCreator/DaoCreator"
import {Avatar} from "../generated/templates"
import {Cowven, DaoCreator} from "../generated/schema"
import {loadOrInitCowven} from "../helpers/initializers"

export function handleNewOrg(event: NewOrg): void {
  const cowven = loadOrInitCowven(event.params._avatar)
  cowven.createdAtBlock = event.block.number
  cowven.createdAtTimestamp = event.block.timestamp.toI32()
  cowven.lastUpdateTimestamp = event.block.timestamp.toI32()
  cowven.save()
  Avatar.create(event.params._avatar)
}
