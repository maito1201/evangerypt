import { ethers } from "hardhat";

async function main() {
  const EVT = await ethers.getContractFactory("EvangeryptToken");
  const token = await EVT.deploy();

  await token.deployed();

  console.log(`deployed to ${token.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
