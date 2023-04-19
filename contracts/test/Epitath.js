const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { keccak256, toUtf8Bytes } = require("ethers/lib/utils");
const { BigNumber } = require("ethers");

const CONTRACT_NAME = "Resval Epitaths"
const CONTRACT_SYMBOL = "RES"

describe("Epitath", function () {
  let epitath;

  beforeEach(async function ()  {
    const Epitath = await ethers.getContractFactory("Epitath");

    epitath = await Epitath.deploy(CONTRACT_NAME, CONTRACT_SYMBOL);
  })

  it("Constructs with correct name and symbol", async function () {
    expect(await epitath.name()).to.equal(CONTRACT_NAME);
    expect(await epitath.symbol()).to.equal(CONTRACT_SYMBOL);
  });

  it("Should mint a string message", async function () {
    const [owner, user] = await ethers.getSigners();
    const message = "rest in peace";
    const tokenId = BigNumber.from(keccak256(toUtf8Bytes(message)));

    await epitath.connect(user).engrave(message, user.address);
    
    console.log(await epitath.tokenURI(tokenId));
    expect(await epitath.ownerOf(tokenId)).to.equal(user.address);
    expect(await epitath.message(tokenId)).to.equal(message);
  });

});
