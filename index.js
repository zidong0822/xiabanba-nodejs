const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/shrink', createProxyMiddleware({ target: 'https://api.tinify.com', changeOrigin: true,onProxyReq:(proxyReq)=>{
    proxyReq.setHeader('authorization','Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy');
    proxyReq.setHeader('Content-type','application/json');
}}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
