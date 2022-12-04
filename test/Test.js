const { expect } = require("chai");
const { ethers } = require("hardhat");

//Agregarle Saldo al Test
describe('addBalance Test Account', function() {
  let myContract;
  let address;

  beforeEach(async function(){
      Deposit = await ethers.getContractFactory("Deposit");
      [address]  = await ethers.getSigners();
      myContract = await Deposit.deploy();
      await setWMaticBalanceFor(myContract.address, ethers.utils.parseUnits('10', 18))
  })

  const setWMaticBalanceFor = async (address, amount) => {
    const wmaticSlot = 3
    const newBalance = ethers.utils.parseUnits(amount)
    const index      = ethers.utils.solidityKeccak256(['uint256', 'uint256'], [address, wmaticSlot])
    const balance32  = ethers.utils.hexlify(ethers.utils.zeroPad(newBalance.toHexString(), 32))
   
    await ethers.provider.send('hardhat_setStorageAt', ["0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", index.toString(), balance32])
  }
  
})

//Ver Balance Test
describe("Ver balance", function(){
    let myContract;
    let address;

    beforeEach(async function(){
        Deposit = await ethers.getContractFactory("Deposit");
        [address]  = await ethers.getSigners();
        console.log((await hre.ethers.provider.getBlock()));
        myContract = await Deposit.deploy();
    })

    describe("Recibir",function () {
      it.only("Enviar a otra cuenta", async function(){
            const provider = waffle.provider;
            expect(await provider.getBalance(myContract.address)).to.equal(0);
            expect( await myContract.getBalance(address.address)).to.equal(0);
            console.log("ea", await myContract.getBalance(address.address));
        })
    })
})

//Depositar
describe('depositTokens', function () {
    let myContract;
    let address;

    beforeEach(async function(){
      Deposit = await ethers.getContractFactory("Deposit");
      myContract = await Deposit.deploy();
      [address]  = await ethers.getSigners();
    })

    it.only('Depositar wmatic', async function () {

      const signer = await myContract.connect(address);
      console.log("ea",signer.signer);
      await signer.userDepositMatic(100);
    });
})