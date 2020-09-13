import Web3 from 'web3';
import contractAbi from '../../build/contracts/MultiSend.json';

export default class MultiSendManager {
  web3: Web3;
  contract: any;

  constructor(web3, address) {
    this.web3 = web3;
    this.contract = new web3.eth.Contract(contractAbi['abi'], address)
  }

  toHex(num) {
    return this.web3.utils.toHex(num);
  }

  multiSendData(addresses, values) {
    const weiValues = values.map((val) => this.toHex(this.web3.utils.toWei(val, 'ether')));
    return this.contract.methods.multiSend(addresses, weiValues).encodeABI();
  }

  multiSendTokenData(contract, addresses, values) {
    const weiValues = values.map((val) => this.toHex(this.web3.utils.toWei(val, 'ether')));
    return this.contract.methods.multiSendToken(contract, addresses, weiValues).encodeABI();
  }
}
