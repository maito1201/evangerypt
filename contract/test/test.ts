import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'


const contractName = 'EvangeryptToken'
const dummyURL = 'http://example.com'

describe('Token contract', function () {
  let contract: Contract
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress
  let addrs: SignerWithAddress[]
  const value = ethers.utils.parseEther('0.1')
    
  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    const factory = await ethers.getContractFactory(contractName)
    contract = await factory.deploy()
  })

  it('Deployment should assign the total supply of tokens to the owner', async function () {
    const ownerBalance = await contract.balanceOf(owner.address)
    expect(await contract.totalSupply()).to.equal(ownerBalance)
  })

  it('safesafeMint success', async function () {
    expect(await contract.totalSupply()).to.equal(0)
    await contract.safeMint(owner.address, dummyURL, 100, { value })
    expect(await contract.totalSupply()).to.equal(1)
    expect(await contract.estimateEarn(0)).to.equal(ethers.utils.parseEther('0.001'))
  })

  it('safeMint require value', async function () {
    expect(await contract.totalSupply()).to.equal(0)
    await expect(contract.connect(addr1).safeMint(addr1.address, dummyURL, 100)).to.revertedWith('safeMint needs tx value more than 100 wei')
    expect(await contract.totalSupply()).to.equal(0)
  })

  it('donate and withdraw success', async function () {
    const defaultAmount = ethers.utils.parseEther('10000')
    const donateAmount = ethers.utils.parseEther('1')
    const totalDonatedAmount = ethers.utils.parseEther('1.1')
    const restAmount = ethers.utils.parseEther('1.089')
    const tokenId = 0
    await contract.safeMint(owner.address, dummyURL, 100, { value })
    
    expect(contract.donateToToken(9999, {value: donateAmount})).to.revertedWith('Token not exists')
    await contract.donateToToken(0, {value: donateAmount})
    expect(await contract.estimateEarn(0)).to.equal(ethers.utils.parseEther('0.011'))
    expect(await contract.getBalance()).to.equal(totalDonatedAmount)
    expect(await contract.getBalanceOfToken(tokenId)).to.equal(totalDonatedAmount)
    expect(await addr1.getBalance()).to.not.greaterThan(defaultAmount)
    
    expect(await contract.connect(addr1).withdrawFromToken(tokenId)).to.not.be.reverted
    expect(await contract.estimateEarn(0)).to.equal(ethers.utils.parseEther('0.01089'))
    expect(await contract.connect(addr1).estimateEarn(0)).to.equal(0)
    expect(await contract.getBalance()).to.equal(restAmount)
    expect(await contract.getBalanceOfToken(tokenId)).to.equal(restAmount)
    expect(await addr1.getBalance()).to.greaterThan(defaultAmount)
    expect(contract.connect(addr1).withdrawFromToken(tokenId)).to.be.revertedWith('lock time has not expired. Please try again later')
  })

  it('withdraw success from 2 tokens', async function () {
    const donateAmount = ethers.utils.parseEther('0.1')
    await contract.safeMint(owner.address, dummyURL, 100, { value })
    await contract.safeMint(owner.address, dummyURL, 100, { value })
    await contract.donateToToken(0, {value: donateAmount})
    await contract.donateToToken(1, {value: donateAmount})
    expect(await contract.getBalance()).to.equal(ethers.utils.parseEther('0.4'))
    expect(await contract.connect(addr1).withdrawFromToken(0)).to.not.be.reverted
    expect(await contract.getBalance()).to.equal(ethers.utils.parseEther('0.398'))
    expect(await contract.connect(addr1).withdrawFromToken(1)).to.not.be.reverted
    expect(await addr1.getBalance()).to.greaterThan(ethers.utils.parseEther('1.2'))
  })

  it('setDistributeNum success', async function () {
    const defaultAmount = ethers.utils.parseEther('10000')
    const donateAmount = ethers.utils.parseEther('1')
    const restAmount = ethers.utils.parseEther('0')
    const tokenId = 0
    await contract.safeMint(owner.address, dummyURL, 100, { value })
    await contract.donateToToken(0, {value: donateAmount})
    expect(contract.setDistoributeNum(0, 0.1)).to.be.reverted
    expect(contract.setDistoributeNum(0, 0)).to.be.revertedWith("Num must be greater than 0")
    expect(contract.setDistoributeNum(0, -1)).to.be.reverted
    expect(contract.setDistoributeNum(9999, 1)).to.be.revertedWith("Token not exists")
    expect(contract.connect(addr2).setDistoributeNum(0, 1)).to.be.revertedWith("Caller is not token owner")
    await contract.setDistoributeNum(0, 1)
    expect(await contract.estimateEarn(0)).to.equal(ethers.utils.parseEther('1.1'))
    
    expect(await contract.connect(addr1).withdrawFromToken(tokenId)).to.not.be.reverted
    expect(await contract.getBalance()).to.equal(restAmount)
    expect(contract.getBalanceOfToken(tokenId)).to.be.revertedWith("Token not exists")
    expect(await addr1.getBalance()).to.greaterThan(defaultAmount)
  })
})
