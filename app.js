// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  // //允许的header类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  // //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})
app.use('/shrink', createProxyMiddleware({ target: 'https://api.tinify.com', changeOrigin: true,onProxyReq:(proxyReq)=>{
    proxyReq.setHeader('authorization','Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy');
    proxyReq.setHeader('Content-type','application/json');
}}));
app.listen(3000);
// [END gae_node_request_example]

module.exports = app;
