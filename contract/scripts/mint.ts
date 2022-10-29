import { ethers } from "hardhat";

const contractAddress = '0xC74d41a1e76A59590D59DF53f151B505f206d8c8'

// MetaMask puclic key @maito1201
const toAddress = '0xcBe10B9C0554ae99D9ec5d64e3E2F900615670dE'

async function main() {
  const EVT = await ethers.getContractFactory("EvangeryptToken");
  const token = await EVT.attach(contractAddress)
  const value = ethers.utils.parseEther('0.1')
  const log = await token.safeMint(toAddress, 'https://polygon.technology/', { value: value })
  console.log(`minted ${log.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
