var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ConversionStore = new Store(AppDispatcher);
var _base = "";
var _ratesObject = {};

ConversionStore.ratesObject = function() {
  return _ratesObject;
};

ConversionStore.setRatesObject = function(rates_object) {
  _base = rates_object["base"];
  _ratesObject = rates_object;
};

ConversionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "RECEIVE_RATES_OBJECT":
    	ConversionStore.setRatesObject(payload.rates_object);
      break;
  }
  ConversionStore.__emitChange();
};

module.exports = ConversionStore;
