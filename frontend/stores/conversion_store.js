var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ConversionStore = new Store(AppDispatcher);

ConversionStore.setRates = function(rates_object) {

};

ConversionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "RECEIVE_RATES_OBJECT":
    	ConversionStore.setRates(payload.rates_object);
      break;
  }
  ConversionStore.__emitChange();
};

module.exports = ConversionStore;
