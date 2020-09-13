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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const EtherManager_1 = __importDefault(require("./services/EtherManager"));
const app = express_1.default();
const eth = new EtherManager_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(function (req, _, next) {
    console.log(`${req.method} ${req.url}\nParams: ${JSON.stringify(req.params)}\n`);
    next();
});
app.post('/transfer', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { address, amount } = req.body;
    const rawTransaction = yield eth.sendEtherRawTx(address, amount);
    try {
        yield eth.sendTransaction(rawTransaction);
        res.send(`Transferred ${amount} ETH to ${address}`);
    }
    catch (err) {
        res.send(`Error ${err}`);
    }
}));
app.post('/multiSend', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const data = req.body.data;
    for (var address in data) {
        console.log(`Transfer ${data[address]} to address ${address}`);
    }
    const rawTransaction = yield eth.multiSendEtherRawTx(Object.keys(data), Object.values(data));
    try {
        yield eth.sendTransaction(rawTransaction);
        res.send('OK');
    }
    catch (err) {
        res.send(`Error ${err}`);
    }
}));
app.post('/multiSendToken', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const token = req.body.token;
    const data = req.body.data;
    for (var address in data) {
        console.log(`Transfer ${data[address]} to address ${address}`);
    }
    const rawTransaction = yield eth.multiSendTokenRawTx(token, Object.keys(data), Object.values(data));
    try {
        yield eth.sendTransaction(rawTransaction);
        res.send('OK');
    }
    catch (err) {
        res.send(`Error ${err}`);
    }
}));
app.get('/getNonce/:address', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const nonce = yield eth.getNonce(req.params.address);
    res.send(`Current Nonce of Address ${req.params.address} => ${nonce}`);
}));
app.listen(process.env.PORT || 3000).on('error', console.log);
;
//# sourceMappingURL=app.js.map