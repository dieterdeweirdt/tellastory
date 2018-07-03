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
  var mood = "";

  if(req && req.body && req.body.queryResult && req.body.queryResult.parameters) {
    var params = req.body.queryResult.parameters;
    var audience = (params.Audience) ? params.Audience.toLowerCase() : 'any';
    var about = (params.Gender) ? ' about a ' + params.Gender.toLowerCase() : '';
    var typeOfStory = (params.TypeOfStory) ? params.TypeOfStory.toLowerCase() : 'story';
    var location = (params.City) ? ' located near ' + params.City.toLowerCase() : '';
    var mood = (params.Mood) ? params.Mood.toLowerCase() : '';
  }
  
  var number_of_stories = audio_list.length;
  var x = Math.floor((Math.random() * number_of_stories));
  var name = audio_list[x]['name'];
  var audio = ' <break time="1s"/> <audio src="' + audio_list[x]['src'] +'">Audio failed to load</audio>';

  switch (audience) {
    //Speech Synthesis Markup Language //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "me":
      speech =
        '<speak>' + name + ' will tell a ' + mood + ' ' + typeOfStory + ' only for you' + about + location + audio + ' </speak>';
      break;
    case "us":
      speech =
        '<speak>Hi you all, ' + name + '  tell a ' + mood + ' ' + typeOfStory + about + location + audio  + ' </speak>';
      break;
    case "family":
      speech =
        '<speak>Hi family, ' + name + '  tell a ' + mood + ' ' + typeOfStory + about + location + audio + ' </speak>';
      break;
    case "kids":
      speech =
        '<speak>Hi kids, ' + name + '  will tell a ' + mood + ' ' + typeOfStory + '' + about + location + audio + '</speak>';
      break; 
    case "any":
      speech =
        '<speak>Hi any, ' + name + ' will tell a ' + mood + ' ' + typeOfStory + '' + about + location + audio + ' </speak>';
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


var audio_list = [
  {
    "name":   "Jennifer", 
    "src":    "https://deweirdt.be/tellastory/jennifer.mp3",
    "mood":   "fun",
    "lang":   "nl",
    "gender":   "f"
  },
  {
    "name":   "Astrid", 
    "src":    "https://deweirdt.be/tellastory/astrid.mp3",
    "mood":   "love",
    "lang":   "nl",
    "gender":   "f"
  },
  {
    "name":   "Bob", 
    "src":    "https://deweirdt.be/tellastory/astrid.mp3",
    "mood":   "love",
    "lang":   "en",
    "gender":   "m"
  },
];

function filterByProperty(array, prop, value){
    var filtered = [];
    for(var i = 0; i < array.length; i++){

        var obj = array[i];

        for(var key in obj){
            if(typeof(obj[key] == "object")){
                var item = obj[key];
                if(item[prop] == value){
                    filtered.push(item);
                }
            }
        }

    }    

    return filtered;

}

