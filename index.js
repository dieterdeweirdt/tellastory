"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "tell-a-story"
  });
});

restService.post("/test", function(req, res) {
  return res.json({speech: 'test'});
});

restService.post("/story", function(req, res) {
  var speech = "";
  var audience = "any";
  var about = "";
  var typeOfStory = "story";
  var location = "";

  if(req && req.body && req.body.queryResult && req.body.queryResult.parameters) {
    var params = req.body.queryResult.parameters;
    var audience = (params.Audience) ? params.Audience.toLowerCase() : 'any';
    var about = (params.Gender) ? ' about a ' + params.Gender.toLowerCase() : '';
    var typeOfStory = (params.TypeOfStory) ? params.TypeOfStory.toLowerCase() : 'story';
    var location = (params.City) ? ' located near ' + params.City.toLowerCase() : '';
  }
  
  switch (audience) {
    //Speech Synthesis Markup Language //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "me":
      speech =
        '<speak>Let me tell a ' + typeOfStory + ' only for you' + about + location + '</speak>';
      break;
    case "us":
      speech =
        '<speak>Hi you all, Let me tell a ' + typeOfStory  + about + location + '</speak>';
      break;
    case "family":
      speech =
        '<speak>Hi family, let me tell a ' + typeOfStory + about + location + '</speak>';
      break;
    case "kids":
      speech =
        '<speak><audio src="http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-96k.ogg"></audio> Hi kids, i will tell a ' + typeOfStory + '' + about + location + '</speak>';
      break; 
    case "any":
      speech =
        '<speak>Hi any, i will tell a ' + typeOfStory + '' + about + location + '</speak>';
      break; 
  }
  return res.json({
    fulfillmentText: speech,
    source: "tell-a-story"
  });
});

/*

<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDAqay1oi2lcRw5hwJrCRT3ebD4yQM7aYk",
    authDomain: "tellmeastory-b1e69.firebaseapp.com",
    databaseURL: "https://tellmeastory-b1e69.firebaseio.com",
    projectId: "tellmeastory-b1e69",
    storageBucket: "tellmeastory-b1e69.appspot.com",
    messagingSenderId: "425190960176"
  };
  firebase.initializeApp(config);
</script>

*/

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
