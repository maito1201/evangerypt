import { ethers } from "hardhat";

const contractAddress = '0x06be81a7DF86A9fb2C412cf9b10eB0B2aB233357'

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
