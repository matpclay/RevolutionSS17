var http = require('http');

var options = {
  host: 'www.alphavantage.co',
  path: '/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=8153'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var json = JSON.parse(str);
    var latestEntry = Object.keys(json["Time Series (Daily)"])[0];
    var openingPrice = json["Time Series (Daily)"][latestEntry]["1. open"];
    var closingPrice = json["Time Series (Daily)"][latestEntry]["4. close"];
    var highPrice = json["Time Series (Daily)"][latestEntry]["2. high"];
    var lowPrice = json["Time Series (Daily)"][latestEntry]["3. low"];
    
    console.log("Time: " + latestEntry);
    console.log("Opening Price: " + openingPrice);
    console.log("Closing Price: " + closingPrice);
    console.log("High Price: " + highPrice);
    console.log("Low Price: " + lowPrice);
  });
}

http.request(options, callback).end();

/*
// For the latest stock update.

var http = require('http');

var options = {
  host: 'www.alphavantage.co',
  path: '/query?function=TIME_SERIES_INTRADAY&symbol=YHOO&interval=1min&apikey=8153'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var json = JSON.parse(str);
    var latestEntry = Object.keys(json["Time Series (1min)"])[0];
    console.log("Time: " + latestEntry);
    console.log("Opening Price: " + json["Time Series (1min)"][latestEntry]["1. open"]);
    console.log("Closing Price: " + json["Time Series (1min)"][latestEntry]["4. close"]);
    console.log("High Price: " + json["Time Series (1min)"][latestEntry]["2. high"]);
    console.log("Low Price: " + json["Time Series (1min)"][latestEntry]["3. low"]);
  });
}

http.request(options, callback).end();

*/