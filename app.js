/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express      = require('express'),
    app          = express(),
    vcapServices = require('vcap_services'),
    extend       = require('util')._extend,
    watson       = require('watson-developer-cloud');

// Bootstrap application settings
require('./config/express')(app);

var mqtt = require('mqtt');

// For local development, replace username and password
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: '',
  password: ''
}, vcapServices.getCredentials('speech_to_text'));

var authService = watson.authorization(config);

var mqttClient;
var mqttConfig = {
  deviceId : "speech",
  deviceType : "watson",
  apiToken : "",
  orgId : "",
  port : "1883"
};

app.get('/', function(req, res) {
  var clientId = ['d', mqttConfig.orgId, mqttConfig.deviceType, mqttConfig.deviceId].join(':');
  mqttClient = mqtt.connect("mqtt://" + mqttConfig.orgId + ".messaging.internetofthings.ibmcloud.com" + ":" + mqttConfig.port, {
    "clientId" : clientId,
    "keepalive" : 30,
    "username" : "use-token-auth",
    "password" : mqttConfig.apiToken
  });

  res.render('index', { ct: req._csrfToken });
});

// Get token using your credentials
app.post('/api/token', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
      next(err);
    else
      res.send(token);
  });
});

app.post('/mqtt', function(req, res, next) {
  //console.log(req.body.text)
  if (mqttClient) {
    mqttClient.publish('iot-2/evt/partial/fmt/json', JSON.stringify({
      "value" : req.body.text
    }), function () {
    }); 
  }
  res.send("ok");
});

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
