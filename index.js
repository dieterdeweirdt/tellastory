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

  var audience = (req && req.body && req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.Audience) ?
    req.body.queryResult.parameters.Audience.toLowerCase() : 'test';

  switch (audience) {
    //Speech Synthesis Markup Language //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "test":
      speech =
        '<speak>This is a test <audio src="http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-96k.ogg">did not get your audio file</audio></speak>';
      break;
    case "me":
      speech =
        '<speak>Let me tell a story only for you</speak>';
      break;
    case "us":
      speech =
        '<speak>Let me tell a story</speak>';
      break;
    case "family":
      speech =
        '<speak>Let me tell a family story</speak>';
      break;
    case "kids":
      speech =
        '<speak><audio src="http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-96k.ogg">did not get your audio file</audio> Hi kids, i will tell a story</speak>';
      break; 
  }
  return res.json({
    fulfillmentText: speech,
    source: "tell-a-story"
  });
});

/*
restService.post("/video", function(req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});

restService.post("/slack-test", function(req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [
      {
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [
          {
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url:
          "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [
          {
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    source: "webhook-echo-sample",
    data: {
      slack: slack_message
    }
  });
});*/

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
