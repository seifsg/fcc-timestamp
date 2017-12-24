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
  const ds = request.params.datestring;
  let date;

  // if empty send back current date
  if(ds === undefined){
    date = new Date();
    response.json({unix: date.getTime(), utc: date.toUTCString()}) ;
  }else{
    // see if its unix timestamp format  
    const isUnix = ds.match(/^[0-9]+$/g) ? true : false;
    // try to make a new date object with provided data
    date = new Date(isUnix ? parseInt(ds) : ds);

    // now test and send back response
    const time = date.getTime();
    if(isNaN(time)){
      response.json({error: 'Invalid Date'});  
    }else{
      response.json({unix: time , utc: date.toUTCString()});
    }

  }
});


// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
