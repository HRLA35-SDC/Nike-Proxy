const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const apiProxy = httpProxy.createProxyServer();
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/dist')));

const serverOne = 'http://localhost:3001';
const serverTwo = 'http://localhost:3002';
const serverThree = 'http://localhost:3003';

app.all('/search/*', function(req, res) {
  console.log('Redirecting to Server1');
  apiProxy.web(req, res, { target: serverOne });
});

app.all('/api/shoes/*', function(req, res) {
  console.log('Redirecting to Server2');
  apiProxy.web(req, res, { target: serverTwo });
});

app.all('/api/shoe/*', function(req, res) {
  console.log('Redirecting to Server2');
  apiProxy.web(req, res, { target: serverTwo });
});

app.all('/api/products/*', function(req, res) {
  console.log('Redirecting to Server3');
  apiProxy.web(req, res, { target: serverThree }, (err) => {
    console.log(err);
  });
});

app.listen(`Nike proxy server listening to port: 3000...`);
