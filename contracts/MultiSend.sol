pragma solidity 0.4.24;

contract Token {
    function transfer(address, uint) public;
}

contract MultiSend {

    address public owner;

    constructor() public payable{
        owner = msg.sender;        
    }

    function multiSend(address[] addrs, uint[] values) public {
        require(msg.sender == owner);
        for(uint256 i = 0; i < addrs.length; i++){
            addrs[i].transfer(values[i]);
        }
    }

    function multiSendToken(address token, address[] addrs, uint[] values) public {
        require(msg.sender == owner);
        Token erc20token = Token(token);
        for(uint256 i = 0; i < addrs.length; i++){
            erc20token.transfer(addrs[i], values[i]);
        }
    }

    function withdraw(uint256 _amount) public {
        require(msg.sender == owner);
        owner.transfer(_amount);
    }

    function () public payable{}   
}
