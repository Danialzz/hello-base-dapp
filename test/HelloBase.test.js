const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloBase", function () {
  let helloBase;
  let owner;
  let user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    const HelloBase = await ethers.getContractFactory("HelloBase");
    helloBase = await HelloBase.deploy("Hello, Base! 🔵");
    await helloBase.waitForDeployment();
  });

  it("should deploy with the correct initial message", async function () {
    expect(await helloBase.getMessage()).to.equal("Hello, Base! 🔵");
  });

  it("should store and retrieve a new message", async function () {
    await helloBase.connect(user).setMessage("GM from Base!");
    expect(await helloBase.getMessage()).to.equal("GM from Base!");
  });

  it("should emit MessageUpdated event on setMessage", async function () {
    await expect(helloBase.connect(user).setMessage("New message"))
      .to.emit(helloBase, "MessageUpdated")
      .withArgs(user.address, "New message");
  });

  it("should revert when message is empty", async function () {
    await expect(helloBase.setMessage("")).to.be.revertedWith("Message cannot be empty");
  });

  it("should revert when message exceeds 280 characters", async function () {
    const longMsg = "a".repeat(281);
    await expect(helloBase.setMessage(longMsg)).to.be.revertedWith("Message too long (max 280 chars)");
  });

  it("should store the owner address", async function () {
    expect(await helloBase.owner()).to.equal(owner.address);
  });
});
