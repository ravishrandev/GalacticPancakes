// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract ItemTransactionContract {
    uint256 public itemTransactionCount = 0;

    // Items Struct
    struct Item {
        uint256 itemID;
        uint256 cost;
        uint256 fromUserID;
        uint256 toUserID;
    }

    // Transactions array
    Item[] public transactions;

    // Transaction ID to Item struct Map
    mapping(uint256 => Item) public transactionsMap;

    // Buying items function 
    function buyItem(uint256 _itemID, uint256 _cost, uint256 _fromUserID, uint256 _toUserID) public {
        Item memory _item = Item({itemID: _itemID, cost: _cost, fromUserID: _fromUserID, toUserID: _toUserID});
        transactions.push(_item);
        transactionsMap[itemTransactionCount] = _item;
        itemTransactionCount++;
    }
}