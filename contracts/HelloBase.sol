// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title HelloBase
/// @notice A simple dApp to store and retrieve a message on Base network
contract HelloBase {
    string private message;
    address public owner;

    event MessageUpdated(address indexed sender, string newMessage);

    constructor(string memory _initialMessage) {
        message = _initialMessage;
        owner = msg.sender;
    }

    /// @notice Store a new message on-chain
    /// @param _newMessage The message to store
    function setMessage(string calldata _newMessage) external {
        require(bytes(_newMessage).length > 0, "Message cannot be empty");
        require(bytes(_newMessage).length <= 280, "Message too long (max 280 chars)");
        message = _newMessage;
        emit MessageUpdated(msg.sender, _newMessage);
    }

    /// @notice Read the current stored message
    /// @return The current message string
    function getMessage() external view returns (string memory) {
        return message;
    }
}
