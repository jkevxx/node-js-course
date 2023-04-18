import express from 'express';

const PORT = 3000;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.get('/account', (req, res) => {
  console.log(req.query); // account?query=example
  res.send('Your personal account');
});

expressApp.put('/product', (req, res) => {
  console.log(req.body);
  res.send();
});

expressApp.listen(PORT, () => {
  console.log(`Server Up in port ${PORT}`);
});
