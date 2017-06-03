var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var Ticker = require('./ticker.js');

var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
mongoose.connect( 'mongodb://localhost/test'); // connect to our database


var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
  connection.open();

}); 

connection.onopen = function(session) {
    function tickerEvent(args, kwargs) {
        var ticker = new Ticker()
        ticker.currencyPair = args[0]
        ticker.last = args[1]
        ticker.lowestAsk = args[2]
        ticker.highestBid = args[3]
        ticker.percentChange = args[4]
        ticker.baseVolume = args[5]
        ticker.quoteVolume = args[6]
        ticker.isFrozen = args[7]
        ticker.hr24High = args[8]
        ticker.hr24Low = args[9]
        ticker.save()
        console.log(ticker)
    }
    session.subscribe('ticker', tickerEvent);
}

connection.onclose = function() {
    console.log("Websocket connection closed");
}

