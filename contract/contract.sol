// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// SHOWCASE, A REAL SOLIDITY FILE IS DEPLOYED VIA REMIX

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @notice ERC20 token used as fractional shares for a specific patent.
///         Includes token-based royalty logic on transfer (in tokens).
contract PatentShare is ERC20 {
    address public royaltyRecipient;
    uint16 public royaltyBps; // basis points (100 = 1%)

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _royaltyRecipient,
        uint16 _royaltyBps,
        address initialHolder
    ) ERC20(_name, _symbol) {
        require(_royaltyBps <= 10000, "royalty too high");
        royaltyRecipient = _royaltyRecipient;
        royaltyBps = _royaltyBps;

        if (_initialSupply > 0) {
            _mint(initialHolder, _initialSupply);
        }
    }

    /// @dev Override new OZ 5.x hook `_update` instead of `_transfer`.
    function _update(address from, address to, uint256 amount) internal override {
        // minting or burning → skip royalty
        if (from == address(0) || to == address(0)) {
            super._update(from, to, amount);
            return;
        }

        // No royalty if disabled or recipient is the royalty receiver
        if (royaltyBps == 0 || royaltyRecipient == address(0) || from == royaltyRecipient) {
            super._update(from, to, amount);
            return;
        }

        uint256 fee = (amount * uint256(royaltyBps)) / 10000;
        if (fee == 0) {
            super._update(from, to, amount);
            return;
        }

        uint256 amountAfterFee = amount - fee;

        // Send royalty fee in tokens to royalty recipient
        super._update(from, royaltyRecipient, fee);
        // Send remainder to actual recipient
        super._update(from, to, amountAfterFee);
    }
}

/// @notice Platform for creating patents, issuing ERC20 share tokens, and selling them for ETH.
contract IdeaVaultPlatform is ERC721, ReentrancyGuard, Ownable {
    struct Patent {
        address creator;
        string descriptionHash; // IPFS hash
        string docsHash;        // IPFS hash for documents
        address shareToken;     // ERC20 token contract
        uint256 totalShares;
        uint256 sharePriceWei;
        uint256 sharesSold;
        bool exists;
    }

    uint256 public nextPatentId = 1;
    mapping(uint256 => Patent) public patents;

    event PatentCreated(uint256 indexed patentId, address indexed creator, address shareToken);
    event SharePurchased(uint256 indexed patentId, address indexed buyer, uint256 amountShares, uint256 paidWei);
    event FundsWithdrawn(address indexed to, uint256 amountWei);

    constructor()
        ERC721("IdeaVaultPatent", "IVP")
        Ownable(msg.sender)
    {}

    /// @notice Create a new patent and deploy an ERC20 token for it.
    function createPatent(
        string memory _descriptionHash,
        string memory _docsHash,
        string memory _shareName,
        string memory _shareSymbol,
        uint256 _totalShares,
        uint256 _sharePriceWei,
        uint16 _royaltyBps
    ) external returns (uint256 patentId) {
        require(bytes(_descriptionHash).length > 0, "description required");
        require(_totalShares > 0, "supply > 0");
        require(_sharePriceWei > 0, "price > 0");
        require(_royaltyBps <= 10000, "royalty too high");

        patentId = nextPatentId++;

        uint256 totalSupplyWithDecimals = _totalShares * (10 ** 18);

        PatentShare share = new PatentShare(
            _shareName,
            _shareSymbol,
            totalSupplyWithDecimals,
            msg.sender,
            _royaltyBps,
            address(this)
        );

        _safeMint(msg.sender, patentId);

        patents[patentId] = Patent({
            creator: msg.sender,
            descriptionHash: _descriptionHash,
            docsHash: _docsHash,
            shareToken: address(share),
            totalShares: totalSupplyWithDecimals,
            sharePriceWei: _sharePriceWei,
            sharesSold: 0,
            exists: true
        });

        emit PatentCreated(patentId, msg.sender, address(share));
    }

    /// @notice Buy shares (tokens) of a patent using ETH.
    function buyShares(uint256 patentId, uint256 tokenAmount) external payable nonReentrant {
        Patent storage p = patents[patentId];
        require(p.exists, "no such patent");
        require(tokenAmount > 0, "amount > 0");
        require(p.sharesSold + tokenAmount <= p.totalShares, "not enough supply");

        uint256 requiredWei = (tokenAmount * p.sharePriceWei) / (10 ** 18);
        require(msg.value >= requiredWei, "insufficient ETH");

        IERC20(p.shareToken).transfer(msg.sender, tokenAmount);
        p.sharesSold += tokenAmount;

        (bool ok, ) = payable(p.creator).call{value: requiredWei}("");
        require(ok, "pay transfer failed");

        if (msg.value > requiredWei) {
            uint256 refund = msg.value - requiredWei;
            (bool ok2, ) = payable(msg.sender).call{value: refund}("");
            require(ok2, "refund failed");
        }

        emit SharePurchased(patentId, msg.sender, tokenAmount, requiredWei);
    }

    /// @notice Withdraw leftover ETH (only contract owner).
    function withdraw(address payable to, uint256 amountWei) external onlyOwner nonReentrant {
        require(to != address(0), "zero address");
        (bool ok, ) = to.call{value: amountWei}("");
        require(ok, "transfer failed");
        emit FundsWithdrawn(to, amountWei);
    }

    function getPatent(uint256 patentId) external view returns (
        address creator,
        string memory descriptionHash,
        string memory docsHash,
        address shareToken,
        uint256 totalShares,
        uint256 sharePriceWei,
        uint256 sharesSold
    ) {
        Patent memory p = patents[patentId];
        require(p.exists, "no such patent");
        return (
            p.creator,
            p.descriptionHash,
            p.docsHash,
            p.shareToken,
            p.totalShares,
            p.sharePriceWei,
            p.sharesSold
        );
    }
}
