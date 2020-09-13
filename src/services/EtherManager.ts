import { Transaction } from 'ethereumjs-tx';
import Web3 from 'web3';
import config from '../config/index';
import MultiSend from './MultiSend';

export default class EtherManager {
  web3: Web3;

  constructor() {
    this.web3 = new Web3();
    this.web3.setProvider(new Web3.providers.WebsocketProvider(config.wssProvider));
  }

  toHex(num) {
    return this.web3.utils.toHex(num);
  }
  
  async getNonce(address) {
    return await this.web3.eth.getTransactionCount(address);
  }

  async sendEtherRawTx(address, amount) {
    let nonce = await this.getNonce(config.metamask.address);
    let gasLimit = config.infura.ropsten.transferGasLimit;
    let gasPrice = await this.web3.eth.getGasPrice();
    let weiAmount = this.web3.utils.toWei(amount, 'ether');
  
    return {
      from:     config.metamask.address,
      to:       address,
      nonce:    nonce,
      gasPrice: this.toHex(gasPrice),
      gasLimit: this.toHex(gasLimit),
      value:    this.toHex(weiAmount),
      data:     '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
    }
  }

  async multiSendEtherRawTx(addresses, values) {
    let nonce = await this.getNonce(config.metamask.address);
    let gasLimit = config.infura.ropsten.contractGasLimit;
    let gasPrice = await this.web3.eth.getGasPrice();
    let weiAmount = this.web3.utils.toWei('0', 'ether');
    let multiSend = new MultiSend(this.web3, config.infura.ropsten.contract.multiSend);

    return {
      from:     config.metamask.address,
      to:       config.infura.ropsten.contract.multiSend,
      nonce:    nonce,
      gasPrice: this.toHex(gasPrice),
      gasLimit: this.toHex(gasLimit),
      value:    this.toHex(weiAmount),
      data:     multiSend.multiSendData(addresses, values)
    } 
  }

  async multiSendTokenRawTx(token, addresses, values) {
    let nonce = await this.getNonce(config.metamask.address);
    let gasLimit = config.infura.ropsten.contractGasLimit;
    let gasPrice = await this.web3.eth.getGasPrice();
    let weiAmount = this.web3.utils.toWei('0', 'ether');
    let multiSend = new MultiSend(this.web3, config.infura.ropsten.contract.multiSend);

    return {
      from:     config.metamask.address,
      to:       config.infura.ropsten.contract.multiSend,
      nonce:    nonce,
      gasPrice: this.toHex(gasPrice),
      gasLimit: this.toHex(gasLimit),
      value:    this.toHex(weiAmount),
      data:     multiSend.multiSendTokenData(token, addresses, values)
    } 
  }

  async sendTransaction(rawTransaction) {
    let signedTransaction = new Transaction(rawTransaction, { 'chain': config.network });
    let privateKey = Buffer.from(config.metamask.privateKey, 'hex');

    signedTransaction.sign(privateKey);

    let serializedTransaction = signedTransaction.serialize().toString('hex');
    this.web3.eth.sendSignedTransaction('0x' + serializedTransaction).on('receipt', console.log);
  }
}
