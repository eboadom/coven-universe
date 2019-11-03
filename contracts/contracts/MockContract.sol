pragma solidity ^0.5.4;

contract TestContract {
    uint256 public testValue = 2;

    function randomFunction() public returns(bool) {
        testValue = 99;
        return true;
    }

    function revertingFunction() public pure returns(bool) {
        revert("REVERTED");
    }

    function randomFunctionWithArg(uint256 _value) public pure returns(uint256) {
        return _value;
    }
}