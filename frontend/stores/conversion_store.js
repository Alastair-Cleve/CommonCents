var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ConversionStore = new Store(AppDispatcher);
var _base = "";
var _ratesObject = {};
var _toAmount = 0;
var _toCurrency = "USD";

ConversionStore.ratesObject = function() {
  return _ratesObject;
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
      break;
    case "RECEIVE_TO_AMOUNT":
      _toAmount = payload.amount;
      break;
    case "RECEIVE_TO_CURRENCY":
      _toCurrency = payload.currency;
      break;
  }
  ConversionStore.__emitChange();
};

module.exports = ConversionStore;
