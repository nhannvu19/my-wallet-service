pragma solidity ^0.4.24;

contract Betnami {

  struct Player {
    address playerAddress;
    uint256 betAmount;
  }

  mapping(address => Player[]) public betPlayers;

  function bet(address _matchSide) public payable {
    Player memory player;
    player.betAmount = msg.value;
    player.playerAddress = msg.sender;
    betPlayers[_matchSide].push(player);
  }

  function getBetPlayersCount(address _matchSide) public constant returns (uint256) {
    return betPlayers[_matchSide].length;
  }

  function getBetPlayer(address _matchSide, uint256 index) public view returns (address, uint256) {
    Player storage player = betPlayers[_matchSide][index];

    return (player.playerAddress, player.betAmount);
  }
}
