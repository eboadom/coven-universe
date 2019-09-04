import Web3 from 'web3';

interface Configuration {
  web3: Web3;
}

export let configuration: Configuration;

export const initConfiguration = async () => {
  configuration = {
    web3: new Web3(new Web3.providers.WebsocketProvider(<string>(
        process.env.API_ETHEREUM_NETWORK_WS_URL
    ))),
  };
};

export const getConfiguration = () => {
  return configuration;
};
