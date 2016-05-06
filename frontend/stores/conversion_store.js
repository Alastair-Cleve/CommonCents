var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ConversionStore = new Store(AppDispatcher);
var _base = "";
var _ratesObject = {};
var _toAmount = 0;
var _toCurrency = "EUR";
var _historicalObject = {};

ConversionStore.ratesObject = function() {
  return _ratesObject;
};

ConversionStore.historicalObject = function() {
  return _historicalObject;
};

ConversionStore.setRatesObject = function(rates_object) {
  _base = rates_object["base"];
  _ratesObject = rates_object;
};

ConversionStore.toAmount = function() {
  return _toAmount;
};

ConversionStore.toCurrency = function () {
  return _toCurrency;
};

ConversionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "RECEIVE_RATES_OBJECT":
    	ConversionStore.setRatesObject(payload.ratesObject);
      ConversionStore.__emitChange();
      break;
    case "RECEIVE_TO_AMOUNT":
      _toAmount = payload.amount;
      ConversionStore.__emitChange();
      break;
    case "RECEIVE_TO_CURRENCY":
      _toCurrency = payload.currency;
      ConversionStore.__emitChange();
      break;
    case "RECEIVE_HISTORICAL_RATES":
      _historicalObject = payload.ratesObject;
      ConversionStore.__emitChange();
      break;
  }
};

module.exports = ConversionStore;
