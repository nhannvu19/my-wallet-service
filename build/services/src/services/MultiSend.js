"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MultiSend_json_1 = __importDefault(require("../../build/contracts/MultiSend.json"));
class MultiSendManager {
    constructor(web3, address) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(MultiSend_json_1.default['abi'], address);
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
exports.default = MultiSendManager;
//# sourceMappingURL=MultiSend.js.map