/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL } = process.env;

module.exports = {
   solidity: "0.8.17",
   networks: {
      hardhat: {
        forking: {
          url: API_URL,
        }
      },
   },
}
