import express from 'express';
import bodyParser from 'body-parser';
import EtherManager from './services/EtherManager';

const app = express();
const eth = new EtherManager();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, _, next) {
  console.log(`${req.method} ${req.url}\nParams: ${JSON.stringify(req.params)}\n`);
  next();
});

app.post('/transfer', async (req, res) => {
  const { address, amount } = req.body;
  const rawTransaction = await eth.sendEtherRawTx(address, amount);
  try {
    await eth.sendTransaction(rawTransaction);
    res.send(`Transferred ${amount} ETH to ${address}`);
  }
  catch (err) {
    res.send(`Error ${err}`);
  }
});

app.post('/multiSend', async (req, res) => {
  const data = req.body.data;

  for(var address in data) {
    console.log(`Transfer ${data[address]} to address ${address}`);
  }

  const rawTransaction = await eth.multiSendEtherRawTx(Object.keys(data), Object.values(data));

  try {
    await eth.sendTransaction(rawTransaction);
    res.send('OK');
  }
  catch (err) {
    res.send(`Error ${err}`);
  }
});

app.post('/multiSendToken', async (req, res) => {
  const token = req.body.token;
  const data = req.body.data;

  for(var address in data) {
    console.log(`Transfer ${data[address]} to address ${address}`);
  }

  const rawTransaction = await eth.multiSendTokenRawTx(token, Object.keys(data), Object.values(data));

  try {
    await eth.sendTransaction(rawTransaction);
    res.send('OK');
  }
  catch (err) {
    res.send(`Error ${err}`);
  }
});

app.get('/getNonce/:address', async(req, res) => {
  const nonce = await eth.getNonce(req.params.address);
  res.send(`Current Nonce of Address ${req.params.address} => ${nonce}`);
});

app.listen(process.env.PORT || 3000).on('error', console.log);;
