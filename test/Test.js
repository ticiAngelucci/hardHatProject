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
    let erc20;

    beforeEach(async function(){
      // Deploy ERC20 token
      const ERC20Contract = await ethers.getContractFactory("MockMaticToken");
      erc20 = await ERC20Contract.deploy();
      await erc20.deployed();
      // Deploy deposit contract
      Deposit = await ethers.getContractFactory("Deposit");
      myContract = await Deposit.deploy();
      [address]  = await ethers.getSigners();
    })

    it.only('Depositar wmatic', async function () {

      const signer = await myContract.connect(address);
      const hash = await myContract.getHash(10000000);
      console.log("hash:", hash);
      /* console.log("qqqqqqqqqqqq", await signer.userDepositMatic(hash,10)); */
    });
})

