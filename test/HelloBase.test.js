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

  it("should track updateCount and lastUpdater", async function () {
    expect(await helloBase.updateCount()).to.equal(0);
    expect(await helloBase.lastUpdater()).to.equal(owner.address);

    await helloBase.connect(user).setMessage("First update");
    expect(await helloBase.updateCount()).to.equal(1);
    expect(await helloBase.lastUpdater()).to.equal(user.address);

    await helloBase.connect(owner).setMessage("Second update");
    expect(await helloBase.updateCount()).to.equal(2);
    expect(await helloBase.lastUpdater()).to.equal(owner.address);
  });

  it("should return full board state", async function () {
    await helloBase.connect(user).setMessage("Board check");
    const [msg, updater, count] = await helloBase.getBoardState();
    expect(msg).to.equal("Board check");
    expect(updater).to.equal(user.address);
    expect(count).to.equal(1);
  });

  it("should emit MessageUpdated event on setMessage", async function () {
    const tx = await helloBase.connect(user).setMessage("New message");
    const receipt = await tx.wait();
    // Find the event
    const event = receipt.logs.find(log => {
      try {
        const parsed = helloBase.interface.parseLog(log);
        return parsed && parsed.name === "MessageUpdated";
      } catch { return false; }
    });
    expect(event).to.not.be.undefined;
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
