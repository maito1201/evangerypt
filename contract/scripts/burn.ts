import { ethers } from "hardhat";

const contractAddress = '0x3f578Ed2AA8825fA3A73DF82AF55F19014534550'

async function main() {
  const EVT = await ethers.getContractFactory("EvangeryptToken");
  const token = await EVT.attach(contractAddress)
  const log = await token.burn(3)
  console.log(`burned ${log.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
