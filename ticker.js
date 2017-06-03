var mongoose = require('mongoose');

var tickerSchema = mongoose.Schema({
    currencyPair: String,
    last: String,
    lowestAsk: String,
    highestBid: String,
    percentChange: String,
    baseVolume: String,
    quoteVolume: String,
    isFrozen: String,
    hr24High: String,
    hr24Low: String,
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    }


})

module.exports = mongoose.model('Ticker', tickerSchema);
