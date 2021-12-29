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
app.use((req, res, next) => {
    //判断路径
      if(req.path !== '/' && !req.path.includes('.')){
        res.set({
          'Access-Control-Allow-Credentials': true, //允许后端发送cookie
          'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
          'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
          'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
          'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
        })
      }
      req.method === 'OPTIONS' ? res.status(204).end() : next()
})
app.use('/shrink', createProxyMiddleware({ target: 'https://api.tinify.com', changeOrigin: true,onProxyReq:(proxyReq)=>{
    proxyReq.setHeader('authorization','Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy');
    proxyReq.setHeader('Content-type','application/json');
}}));
app.listen(3000);
// [END gae_node_request_example]

module.exports = app;
