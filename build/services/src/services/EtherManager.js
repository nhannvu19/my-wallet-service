"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethereumjs_tx_1 = require("ethereumjs-tx");
const web3_1 = __importDefault(require("web3"));
const index_1 = __importDefault(require("../config/index"));
const MultiSend_1 = __importDefault(require("./MultiSend"));
class EtherManager {
    constructor() {
        this.web3 = new web3_1.default();
        this.web3.setProvider(new web3_1.default.providers.WebsocketProvider(index_1.default.wssProvider));
    }
    toHex(num) {
        return this.web3.utils.toHex(num);
    }
    getNonce(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.web3.eth.getTransactionCount(address);
        });
    }
    sendEtherRawTx(address, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let nonce = yield this.getNonce(index_1.default.metamask.address);
            let gasLimit = index_1.default.infura.ropsten.transferGasLimit;
            let gasPrice = yield this.web3.eth.getGasPrice();
            let weiAmount = this.web3.utils.toWei(amount, 'ether');
            return {
                from: index_1.default.metamask.address,
                to: address,
                nonce: nonce,
                gasPrice: this.toHex(gasPrice),
                gasLimit: this.toHex(gasLimit),
                value: this.toHex(weiAmount),
                data: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
            };
        });
    }
    multiSendEtherRawTx(addresses, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let nonce = yield this.getNonce(index_1.default.metamask.address);
            let gasLimit = index_1.default.infura.ropsten.contractGasLimit;
            let gasPrice = yield this.web3.eth.getGasPrice();
            let weiAmount = this.web3.utils.toWei('0', 'ether');
            let multiSend = new MultiSend_1.default(this.web3, index_1.default.infura.ropsten.contract.multiSend);
            return {
                from: index_1.default.metamask.address,
                to: index_1.default.infura.ropsten.contract.multiSend,
                nonce: nonce,
                gasPrice: this.toHex(gasPrice),
                gasLimit: this.toHex(gasLimit),
                value: this.toHex(weiAmount),
                data: multiSend.multiSendData(addresses, values)
            };
        });
    }
    multiSendTokenRawTx(token, addresses, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let nonce = yield this.getNonce(index_1.default.metamask.address);
            let gasLimit = index_1.default.infura.ropsten.contractGasLimit;
            let gasPrice = yield this.web3.eth.getGasPrice();
            let weiAmount = this.web3.utils.toWei('0', 'ether');
            let multiSend = new MultiSend_1.default(this.web3, index_1.default.infura.ropsten.contract.multiSend);
            return {
                from: index_1.default.metamask.address,
                to: index_1.default.infura.ropsten.contract.multiSend,
                nonce: nonce,
                gasPrice: this.toHex(gasPrice),
                gasLimit: this.toHex(gasLimit),
                value: this.toHex(weiAmount),
                data: multiSend.multiSendTokenData(token, addresses, values)
            };
        });
    }
    sendTransaction(rawTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let signedTransaction = new ethereumjs_tx_1.Transaction(rawTransaction, { 'chain': index_1.default.network });
            let privateKey = Buffer.from(index_1.default.metamask.privateKey, 'hex');
            signedTransaction.sign(privateKey);
            let serializedTransaction = signedTransaction.serialize().toString('hex');
            this.web3.eth.sendSignedTransaction('0x' + serializedTransaction).on('receipt', console.log);
        });
    }
}
exports.default = EtherManager;
//# sourceMappingURL=EtherManager.js.map