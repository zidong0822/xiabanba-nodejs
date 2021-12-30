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

const express = require('express')
const cors = require('cors')
const axios = require('axios');
const app = express()
const bodyParser = require('body-parser')
const port = 8080
app.use(cors());
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.raw({ type:'*/*' }));
app.post('/', (req, res) => {
axios({
    method: 'POST',
    url: `https://api.tinify.com/shrink`,
    headers:{
      'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
      'Content-type':'application/json'
    },
    data:req.body
  }).then(result=>{
    res.json({
      status: 'ok',
      data: result.data
    })
  })
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app;
