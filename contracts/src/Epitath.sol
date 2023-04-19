// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../lib/Base64.sol";

contract Epitath is ERC721 {
    mapping(uint256 => string) messages;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function engrave(
        string memory _message,
        address to
    ) public returns (uint256 tokenId) {
        tokenId = uint256(keccak256(bytes(_message)));

        messages[tokenId] = _message;
        _safeMint(to, tokenId);
    }

    function message(uint256 id) public view returns (string memory) {
        return messages[id];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            string(
                                abi.encodePacked(
                                    '{"name": "',
                                    "Epitath Message",
                                    '", "image":"',
                                    " ",
                                    '", "description":"',
                                    messages[tokenId],
                                    '"}'
                                )
                            )
                        )
                    )
                )
            );
    }
}
