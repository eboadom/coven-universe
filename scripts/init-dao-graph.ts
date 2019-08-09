import {writeObjectToFile, spawn, writeTextToFile} from "../utils/common-utils"
import {ls, cd} from "shelljs"
import {readFileSync} from "fs"

const moveABIsToGraphDao = async (
  ABIsFolder: string,
  graphDaoABIsFolder: string,
) => {
  for (const fileName of ls(ABIsFolder)) {
    await writeObjectToFile(
      `${graphDaoABIsFolder}/${fileName}`,
      require(`../build/contracts/${fileName}`).abi,
    )
  }
}

const generateGraphDaoSchemaFromSchemas = async (
  mappingsFolder: string,
  graphDaoFolder: string,
) => {
  let schema = ""
  for (const folderName of ls(mappingsFolder)) {
    const mappingContent = readFileSync(
      `${mappingsFolder}/${folderName}/schema.graphql`,
      "utf-8",
    )
    schema =
      schema +
      `# START ${folderName}\n${mappingContent}\n# END ${folderName}\n\n`
  }
  await writeTextToFile(`${graphDaoFolder}/schema.graphql`, schema)
}

const scaffoldGraphDao = async () => {
  const graphDaoFolder = "graph-dao"
  const ABIsFolder = `build/contracts/`
  const mappingsFolder = `graph-dao/src/mappings`
  const graphDaoABIsFolder = `${graphDaoFolder}/abis`
  const npmInstallGraphDaoCommand = ["npm", "i"]

  console.log(`:):) npm install of the graph-dao\n`)
  cd(graphDaoFolder)
  await spawn(npmInstallGraphDaoCommand)
  cd("..")
  console.log(`:):) Moving contracts ABIs to graph-dao folder\n`)
  await moveABIsToGraphDao(ABIsFolder, graphDaoABIsFolder)
  console.log(
    `:):) Generating merged schema from individual contract schemas\n`,
  )
  await generateGraphDaoSchemaFromSchemas(mappingsFolder, graphDaoFolder)
}

const main = () => {
  ;(async () => {
    try {
      await scaffoldGraphDao()
    } catch (error) {
      console.log(error)
    }
  })()
}

main()
