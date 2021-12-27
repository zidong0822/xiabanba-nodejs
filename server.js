const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/shrink', createProxyMiddleware({ target: 'https://api.tinify.com', changeOrigin: true }));
app.listen(3000);