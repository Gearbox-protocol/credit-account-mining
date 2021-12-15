/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: process.env.ETH_PROVIDER,
        blockNumber: Number(process.env.ETH_BLOCK)
      }
    }
  },
  solidity: "0.7.3"
};
