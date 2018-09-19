const express = require('express');
const path = require('path');
const config = require ('./config');

const app = express();

app.use(express.static(path.join(__dirname, 'dist'), {
  maxage: '30d',
}));

app.use('*', express.static(path.join(__dirname, 'dist/index.html')));

app.listen(config.port, () => {
  console.log(`Listening on :${config.port}`);
});
