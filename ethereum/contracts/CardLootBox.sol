pragma solidity ^0.5.0;

import "./token/ERC721/TradeableERC721Token.sol";
import "./Card.sol";
import "./Factory.sol";
import "./ownership/Ownable.sol";

contract CardLootBox is TradeableERC721Token {
    uint256 NUM_CARDS_PER_BOX = 3;
    uint256 OPTION_ID = 0;
    address factoryAddress;

    constructor(address _proxyRegistryAddress, address _factoryAddress) TradeableERC721Token("CardLootBox", "LOOTBOX", _proxyRegistryAddress) public {
        factoryAddress = _factoryAddress;
    }

    function unpack(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);

        // Insert custom logic for configuring the item here.
        for (uint256 i = 0; i < NUM_CARDS_PER_BOX; i++) {
            // Mint the ERC721 item(s).
            Factory factory = Factory(factoryAddress);
            factory.mint(OPTION_ID, msg.sender);
        }

        // Burn the presale item.
        _burn(msg.sender, _tokenId);
    }

    function baseTokenURI() public view returns (string memory) {
        return "https://us-central1-gameofblocks-staging.cloudfunctions.net/box/";
    }

    function itemsPerLootbox() public view returns (uint256) {
        return NUM_CARDS_PER_BOX;
    }
}