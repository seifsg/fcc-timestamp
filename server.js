// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp/:datestring?", function (request, response) {
  let date;

  if(request.params.datestring === undefined){
    date = new Date();
    response.json({unix: date.getTime(), utc: date.toUTCString()}) ;
  }else{
    date = new Date(request.params.datestring);
    const time = date.getTime();
    if(isNaN(time)){
      response.json({error: 'Invalid Date'});  
    }
    response.json({unix: time , utc: date.toUTCString()});
  }
});


// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
