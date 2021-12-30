// // Copyright 2017 Google LLC
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //      http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.

// 'use strict';

// // [START gae_node_request_example]
// const express = require('express');
// const axios = require('axios');
// const fs = require('fs');
// const bp = require('body-parser')
// const app = express();
// app.use(bp.json())
// app.use(bp.urlencoded({ extended: true }))
// app.post('/', (req, res) => {
//   res.set({
//     'Access-Control-Allow-Origin':'*'
//   })
//   console.log('123123213',req.body);
//   //  axios({
//   //     method: 'POST',
//   //     url: `https://api.tinify.com/shrink`,
//   //     headers:{
//   //       'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
//   //       'Content-type':'application/json'
//   //     },
//   //     data:req.body
//   //   }).then((res)=>{
//   //     console.log('结果',res);
//   //   })
//   res.send('hello world')
// })
// app.listen(8080);
// // [END gae_node_request_example]

// module.exports = app;
const express = require('express')
const cors = require('cors')
const axios = require('axios');
const fs = require('fs');
const app = express()
const bodyParser = require('body-parser')
const port = 3200
app.use(cors());
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Credentials': true, //允许后端发送cookie
    'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
    'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
  })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
  })
app.use(bodyParser.raw({ type:'*/*' }));
app.post('/', (req, res) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
axios({
    method: 'POST',
    url: `https://api.tinify.com/shrink`,
    headers:{
      'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
      'Content-type':'application/json'
    },
    data:req.body
  }).then(result=>{
    res.json(result.data)
  })

  // fs.readFile('./03.png',function (err, data) {
  //   console.log(data.length,req.body);
  //   var buf = new Buffer(req.body.toString('binary'),'binary');
  //   console.log(buf.length);
  
  // })
  console.log(req.body);
  // var buf = new Buffer(req.body.toString('binary'),'binary');
  // axios({
  //   method: 'POST',
  //   url: `https://api.tinify.com/shrink`,
  //   headers:{
  //     'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
  //     'Content-type':'application/json'
  //   },
  //   data:buf
  // }).then(aa=>{
  //   console.log('123',aa);
  // })
    // var buf = new Buffer(req.body.toString('binary'),'binary');
    //  axios({
    //   method: 'POST',
    //   url: `https://api.tinify.com/shrink`,
    //   headers:{
    //     'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
    //     'Content-type':'application/json'
    //   },
    //   data:JSON.stringify({
    //     "source": {
    //       "url": "https://tinypng.com/images/panda-happy.png"
    //     }
    //   })
    // }).then((res)=>{
    //   console.log('结果',res);
    // })
  // res.send("Received POST Data!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))