// index.js
// where your node app starts
const requestIp = require('request-ip');
const acceptLanguageParser = require('accept-language-parser');
const UAParser = require('ua-parser-js');
// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, res) => {
  const ipAddress =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Retrieve preferred languages from headers
  const acceptLanguageHeader = req.headers['accept-language'];
  const preferredLanguages = acceptLanguageHeader
    ? acceptLanguageHeader.split(',')
    : [];
  const formattedLanguages = preferredLanguages
    .map((language) => {
      const [lang, qValue] = language.trim().split(';q=');
      return `${lang}${qValue ? `;q=${qValue}` : ''}`;
    })
    .join(',');
  // Retrieve browser information from headers
  const userAgentString = req.headers['user-agent'];

  // Now you can parse the user-agent string to get detailed browser information
  // For example, using the 'ua-parser-js' library as shown in the previous example

  res.json({
    ipaddress: ipAddress,
    language: formattedLanguages,
    software: userAgentString,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
