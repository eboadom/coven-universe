import {migrationHandler} from "../../../utils/truffle/cheezy-dao-migrations-env"

export const initialMigration: Truffle.Migration = migrationHandler(
  "Deploying Migrations contract",
  artifacts,
  async ({deployMigrationsContract}) => {
    await deployMigrationsContract()
  },
)

module.exports = initialMigration
