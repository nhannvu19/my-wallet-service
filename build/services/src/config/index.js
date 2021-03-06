"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INFURA = {
    ropsten: {
        wssProvider: 'wss://ropsten.infura.io/ws/v3/a5ffbd86e1b342afa72e4ab48715e0f9',
        projectId: 'a5ffbd86e1b342afa72e4ab48715e0f9',
        transferGasLimit: 44000,
        contractGasLimit: 99000,
        contract: {
            multiSend: '0x26bbb4aa8ceb3d29974f0828cc9a77e6caa3f9f6'
        }
    }
};
const METAMASK = {
    address: '0x2a6B67dE8D6C6364C05D187B4f5Ff9Db6228979B',
    privateKey: 'dd585659e015dba06439a322ace46ab63f775497be194ca32aa938d100821986'
};
// const METAMASK = {
//   address: '0xaed0146f9bac5d4cb0744015b9ecc329755fa529',
//   privateKey: 'b121972d847c926de8ed5e4ec2163fb775d9c846238df5584cb293044e68f4f2'
// }
const NETWORK = 'ropsten';
const CONFIG = {
    infura: INFURA,
    network: NETWORK,
    metamask: METAMASK,
    wssProvider: INFURA[NETWORK].wssProvider
};
exports.default = CONFIG;
//# sourceMappingURL=index.js.map