// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title HelloBase
/// @notice An on-chain public message board on Base — leave your mark on L2
/// @dev Stores the latest message + tracks total updates and last writer
contract HelloBase {
    string private message;
    address public lastUpdater;
    uint256 public updateCount;

    event MessageUpdated(
        address indexed sender,
        string newMessage,
        uint256 indexed updateId,
        uint256 timestamp
    );

    constructor(string memory _initialMessage) {
        require(bytes(_initialMessage).length > 0, "Initial message cannot be empty");
        require(bytes(_initialMessage).length <= 280, "Message too long (max 280 chars)");
        message = _initialMessage;
        lastUpdater = msg.sender;
        updateCount = 0;
        emit MessageUpdated(msg.sender, _initialMessage, 0, block.timestamp);
    }

    /// @notice Store a new message on-chain (max 280 characters)
    /// @param _newMessage The message to store
    function setMessage(string calldata _newMessage) external {
        require(bytes(_newMessage).length > 0, "Message cannot be empty");
        require(bytes(_newMessage).length <= 280, "Message too long (max 280 chars)");
        
        message = _newMessage;
        lastUpdater = msg.sender;
        updateCount += 1;
        
        emit MessageUpdated(msg.sender, _newMessage, updateCount, block.timestamp);
    }

    /// @notice Read the current stored message
    /// @return The current message string
    function getMessage() external view returns (string memory) {
        return message;
    }

    /// @notice Get full board state in one call
    function getBoardState()
        external
        view
        returns (
            string memory currentMessage,
            address currentLastUpdater,
            uint256 totalUpdates
        )
    {
        return (message, lastUpdater, updateCount);
    }
}
