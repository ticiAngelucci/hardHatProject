const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ver balance", function(){
    let myContract;
    let address;

    beforeEach(async function(){
        Deposit = await ethers.getContractFactory("Deposit");
        [address]  = await ethers.getSigners();

        myContract = await Deposit.deploy();
    })

    describe("receive",function () {
        it("Should send something to another account", async function(){
            const provider = waffle.provider;

            expect(await provider.getBalance(myContract.address)).to.equal(0);
        })
    })
})