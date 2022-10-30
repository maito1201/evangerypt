import { ethers } from "hardhat";

const contractAddress = '0x06be81a7DF86A9fb2C412cf9b10eB0B2aB233357'

// MetaMask puclic key @maito1201
const toAddress = '0xcBe10B9C0554ae99D9ec5d64e3E2F900615670dE'

async function main() {
  const EVT = await ethers.getContractFactory("EvangeryptToken");
  const token = await EVT.attach(contractAddress)
  const value = ethers.utils.parseEther('0.1')
  const log = await token.safeMint(toAddress, 'https://polygon.technology/', 100, { value: value })
  console.log(`minted ${log.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
