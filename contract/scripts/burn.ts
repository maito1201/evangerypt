import { ethers } from "hardhat";

const contractAddress = '0xC74d41a1e76A59590D59DF53f151B505f206d8c8'

async function main() {
  const EVT = await ethers.getContractFactory("EvangeryptToken");
  const token = await EVT.attach(contractAddress)
  const log = await token.burn(0)
  console.log(`burned ${log.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
