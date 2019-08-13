import {writeObjectToFile, spawn, writeTextToFile} from "../utils/common-utils"
import {ls, cd} from "shelljs"
import {readFileSync} from "fs"
import * as yaml from "js-yaml"
import {ContractId} from "../utils/types"

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

const buildYamlContractFragmentFromDatasource = (
  mappingsFolder: string,
  graphDaoABIsFolder: string,
  ethereumNetwork: string,
  contractName: ContractId,
  contractAddress: string,
) => {
  const {abis, entities, eventHandlers} = yaml.safeLoad(
    readFileSync(`${mappingsFolder}/${contractName}/datasource.yaml`, "utf-8"),
  )

  return {
    kind: "ethereum/contract",
    name: `${contractName}`,
    network: `${ethereumNetwork}`,
    source: {
      address: contractAddress,
      abi: abis && abis.length ? abis[0] : contractName,
    },
    mapping: {
      kind: "ethereum/events",
      apiVersion: "0.0.1",
      language: "wasm/assemblyscript",
      file: `src/mappings/${contractName}/mapping.ts`,
      entities,
      abis: (abis || [contractName]).map((contractName: ContractId) => ({
        name: contractName,
        file: `./abis/${contractName}.json`,
      })),
      eventHandlers,
    },
  }
}

const generateSubgraphYamlFromDatasources = async (
  contractsAddressesFilePath: string,
  graphDaoFolder: string,
  mappingsFolder: string,
  graphDaoABIsFolder: string,
) => {
  const contractsAddresses = require(contractsAddressesFilePath)
  const dataSources = []
  for (const folderName of ls(mappingsFolder)) {
    if (Object.keys(contractsAddresses).includes(folderName)) {
      console.log("\n\n")
      const yamlContract = buildYamlContractFragmentFromDatasource(
        mappingsFolder,
        graphDaoABIsFolder,
        "development",
        <ContractId>folderName,
        contractsAddresses[folderName].address,
      )
      dataSources.push(yamlContract)
    }
  }
  const subgraph = {
    specVersion: "0.0.1",
    schema: {file: "./schema.graphql"},
    dataSources,
  }
  await writeTextToFile(
    `${graphDaoFolder}/subgraph.yaml`,
    yaml.safeDump(subgraph, {noRefs: true}),
  )
}

const scaffoldGraphDao = async () => {
  const graphDaoFolder = "graph-dao"
  const ABIsFolder = `build/contracts/`
  const mappingsFolder = `graph-dao/src/mappings`
  const graphDaoABIsFolder = `${graphDaoFolder}/abis`
  const graphTypesFolder = `${graphDaoFolder}/src/types`
  const npmInstallGraphDaoCommand = ["npm", "i"]
  const removeGraphDaoSchema = ["rm", `${graphDaoFolder}/schema.graphql`]
  const removeSubgraphYaml = ["rm", `${graphDaoFolder}/subgraph.yaml`]
  const generateGraphTypes = [
    "graph",
    "codegen",
    `--output-dir ${graphTypesFolder}`,
    `${graphDaoFolder}/subgraph.yaml`,
  ]
  const contractsAddressesFilePath =
    "../migrations/data/temp-contract-addresses.json"

  console.log(`:):) npm install of the graph-dao\n`)
  cd(graphDaoFolder)
  await spawn(npmInstallGraphDaoCommand)
  cd("..")
  console.log(`:):) Moving contracts ABIs to graph-dao folder\n`)
  await moveABIsToGraphDao(ABIsFolder, graphDaoABIsFolder)
  console.log(
    `:):) Generating new merged schema schema.graphql from individual contract schemas\n`,
  )
  // await spawn(removeGraphDaoSchema)
  // await generateGraphDaoSchemaFromSchemas(mappingsFolder, graphDaoFolder)
  console.log(
    `:):) Generating new merged subgraph.yaml from individual datasources.yaml of contracts\n`,
  )
  await spawn(removeSubgraphYaml)
  await generateSubgraphYamlFromDatasources(
    contractsAddressesFilePath,
    graphDaoFolder,
    mappingsFolder,
    graphDaoABIsFolder,
  )
  console.log(`:):) Generating graph types with graph codegen\n`)
  await spawn(generateGraphTypes)
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
