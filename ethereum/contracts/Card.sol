pragma solidity ^0.5.0;

import "./token/ERC721/TradeableERC721Token.sol";
import "./ownership/Ownable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract Card is TradeableERC721Token {
  constructor(address _proxyRegistryAddress) TradeableERC721Token("Card", "GOB", _proxyRegistryAddress) public {  }

  function baseTokenURI() public view returns (string memory) {
    return "https://us-central1-gameofblocks-staging.cloudfunctions.net/cards/";
  }
}