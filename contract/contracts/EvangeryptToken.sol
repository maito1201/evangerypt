// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EvangeryptToken is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
  using Counters for Counters.Counter;
  using SafeMath for uint;
  using SafeMath for uint256;
  mapping(address => mapping(uint => uint)) public tokenWithdrawed;
  mapping(uint => uint) public balancePerToken;
  mapping(uint => uint) public distributeNumPerToken;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721("EvangeryptToken", "EVT") {}

  function safeMint(address to, string memory uri, uint distributeNum) public payable {
    require (msg.value >= 100, "safeMint needs tx value more than 100 wei");  
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
    balancePerToken[tokenId] =  msg.value;
    distributeNumPerToken[tokenId] = distributeNum;
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function donateToToken(uint tokenId) public payable {
    require(_exists(tokenId), "Token not exists");
    _donateToToken(tokenId);
  }

  function _donateToToken(uint tokenId) internal {
    balancePerToken[tokenId] = balancePerToken[tokenId] + msg.value;
  }

  function withdrawFromToken(uint tokenId) public payable {
    require(_exists(tokenId), "Token not exists");
    require(tokenWithdrawed[msg.sender][tokenId] == 0, "This token is already withdrawed");
    uint amount = balancePerToken[tokenId] / distributeNumPerToken[tokenId];
    require(balancePerToken[tokenId] >= amount, "Not enough funds in the token. donate required");
    Address.sendValue(payable(msg.sender), amount);
    balancePerToken[tokenId] = balancePerToken[tokenId] - amount;
    tokenWithdrawed[msg.sender][tokenId] = 1;
    if (balancePerToken[tokenId] < 100) {
      _burn(tokenId);
    }
  }

  function setDistoributeNum(uint tokenId, uint num) public {
    require(_exists(tokenId), "Token not exists");
    require(_isOwner(msg.sender, tokenId), "Caller is not token owner");
    require(num > 0, "Num must be greater than 0");
    _setDistributeNum(tokenId, num);
  }

  function _setDistributeNum(uint tokenId, uint num) internal {
    distributeNumPerToken[tokenId] = num;
  }

  function getBalanceOfToken(uint tokenId) public view returns(uint) {
    require(_exists(tokenId), "Token not exists");
    return balancePerToken[tokenId];
  }

  function getBalance() public view returns(uint) {
    return address(this).balance;
  }

  function estimateEarn(uint256 tokenId) public view returns(uint) {
    if (tokenWithdrawed[msg.sender][tokenId] > 0) {
      return 0;
    }
    return balancePerToken[tokenId] / distributeNumPerToken[tokenId];
  }

  function _isOwner(address spender, uint256 tokenId) internal view returns (bool) {
    address owner = ERC721.ownerOf(tokenId);
    return spender == owner;
  }
}
