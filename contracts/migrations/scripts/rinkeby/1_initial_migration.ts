import {migrationHandler} from "../../utils/migration-handler"

export const initialMigration: Truffle.Migration = migrationHandler(
  "Deploying Migrations contract",
  artifacts,
  async ({deployMigrationsContract}) => {
    await deployMigrationsContract()
  },
)

module.exports = initialMigration
