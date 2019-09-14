import Web3 from 'web3';

export const getWeb3 = () => new Web3(window.ethereum);
