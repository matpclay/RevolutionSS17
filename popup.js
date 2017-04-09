var tick = document.getElementById('search');
submit.addEventListener('click', function() {
  retQuote(tick);
}, false);

function retQuote(ticker) {
  var location = '/query?function=TIME_SERIES_DAILY&symbol=';
  var apiKey = "&apikey=8153";
  var host ='www.alphavantage.co';

  location = host + location + ticker.value + apiKey;

    var str = '';

    //the whole response has been recieved, so we just print it out here
    function responseReceived(json) {
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
      // append values to HTML
      document.getElementById('ticker').innerHTML = ticker;
      document.getElementById('time').innerHTML = latestEntry;
      document.getElementById('close').innerHTML = closingPrice;
      document.getElementById('open').innerHTML = openingPrice;
      document.getElementById('high').innerHTML = highPrice;
      document.getElementById('low').innerHTML = lowPrice;
    };

var xhr = new XMLHttpRequest();
xhr.onSomething = function(response) {
  responseReceived(responseJson);
}
xhr.open();
xhr.send();

  // fetch(location)
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(responseJson) {
  //     // do something useful with the json data
  //     responseReceived(responseJson);
  //   });
}
