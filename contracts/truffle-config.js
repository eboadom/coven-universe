require("ts-node/register")
const HDWalletProvider = require("truffle-hdwallet-provider")

module.exports = {
  migrations_file_extension_regexp: /.*\.js$/,
  test_file_extension_regexp: /.*\.ts$/,

  networks: {
    development: {
      host: "ganache", // hostname of the ganache network in the docker network
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 10000000000, // 10 GWei (in wei)
    },

    kovan: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC_TRUFFLE_KOVAN || process.env.PK_TRUFFLE_KOVAN,
          process.env.URL_ETHEREUM_HTTP_PROVIDER_KOVAN,
        ),
      from: process.env.HDWALLET_ADDRESS_KOVAN,
      network_id: "42",
      gas: 6500000,
      gasPrice: 1000000000, // 1 GWei (in wei)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    },

    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC_TRUFFLE_RINKEBY ||
            process.env.PK_TRUFFLE_RINKEBY,
          process.env.URL_ETHEREUM_HTTP_PROVIDER_RINKEBY,
        ),
      from: process.env.HDWALLET_ADDRESS_RINKEBY,
      network_id: "4",
      gas: 6500000,
      gasPrice: 40000000000, // 10 GWei (in wei)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    },
  },

  mocha: {
    timeout: 100000,
  },

  compilers: {
    solc: {
      version: "0.5.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "petersburg",
      },
    },
  },
}
