import {getTestsEnv} from "../../../utils/truffle/cheezy-dao-tests-env"

contract("Avatar test", (accounts: string[]) => {
  it("Initial test", async () => {
    const {
      deployedInstances: {avatarInstance},
    } = await getTestsEnv(artifacts, accounts)

    
  })
})
