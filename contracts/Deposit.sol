 // SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import '../interface/openzeppelin/IERC20.sol';

interface IaToken {
    function balanceOf(address _user) external view returns (uint256);
    function redeem(uint256 _amount) external;
}


interface IAaveLendingPool {
    function deposit(address _reserve, uint256 _amount, uint16 _referralCode) external;
}

contract Deposit {
    IERC20 public matic = IERC20(0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270);
    IaToken public aToken = IaToken(0x58AD4cB396411B691A9AAb6F74545b2C5217FE6a);
    IAaveLendingPool public aaveLendingPool = IAaveLendingPool(0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c);
    
    mapping(address => uint256) public userDepositedMatic;
    
    constructor() {
        matic.approve(address(aaveLendingPool), type(uint256).max);
    }
    receive() external payable{
        userDepositedMatic[msg.sender] += msg.value;
    }
    //Funcion para ver el balance
    function getBalance(address accountAddress) external view returns (uint256){
        return userDepositedMatic[accountAddress];
    }
    //Funcion para depositar
    function userDepositMatic(uint256 _amountInMatic) external {
        userDepositedMatic[msg.sender] = _amountInMatic;
        require(matic.transferFrom(msg.sender, address(this), _amountInMatic), "Matic Deposito fallo");
        aaveLendingPool.deposit(address(matic), _amountInMatic, 0);
    }
    //Funcion para retirar lo depositado
   /*  function userWithdrawMatic(uint256 _amountInMatic) external {
        require(userDepositedMatic[msg.sender] >= _amountInMatic, "No se puede retirar mas de lo depositado");

        aToken.redeem(_amountInMatic);
        require(matic.transferFrom(address(this), msg.sender, _amountInMatic), "Matic Transferencia fallo");
        
        userDepositedMatic[msg.sender] = userDepositedMatic[msg.sender] - _amountInMatic;
    } */
}