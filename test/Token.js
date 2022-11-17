/* const { expectRevert } = require("@openzeppelin/test-helpers");
const { artifacts } = require("hardhat");

const Deposit = artifacts.require("Deposit");

contract ("Deposit", () =>{
  let deposit;

  before(async () => {
    deposit = await Deposit.deployed();
  });
  const _amountInMatic = 10;
  describe('Deposit Contract', () =>{
    it('deposito test', () => {
      return expectRevert(
        deposit.userDepositMatic(
        _amountInMatic
      ), "error")
    })
  });
})
 */