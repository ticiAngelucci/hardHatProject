//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MockMaticToken is ERC20 {
  constructor() ERC20("MockMaticToken", "MATIC") {
    _mint(msg.sender, 1000 * 10 ** decimals());
  }
}