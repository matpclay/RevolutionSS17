var tick = document.getElementById('search');
//console.log(tick);
submit.addEventListener('click', function() {
  retQuote(tick);
}, false);

function retQuote(ticker) {
  var location = '/query?function=TIME_SERIES_DAILY&symbol=';
  var apiKey = "&apikey=8153";
  var host ='http://www.alphavantage.co';

  location = host + location + ticker.value + apiKey;
  var t = "Ticker: ";
  var c = "Most Recent Price: ";
  var o = "Most Recent Open: ";
  var h = "Daily High: ";
  var l = "Daily Low: ";

    // the whole response has been recieved, so we just print it out here
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
      document.getElementById('ticker').innerText = t + ticker.value.toUpperCase();
      document.getElementById('close').innerText = c + closingPrice;
      document.getElementById('open').innerText = o + openingPrice;
      document.getElementById('high').innerText = h + highPrice;
      document.getElementById('low').innerText = l + lowPrice;
    };
    function ajax_get(url, callback) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log('responseText:' + xmlhttp.responseText);
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch(err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    ajax_get(location, responseReceived);
}
