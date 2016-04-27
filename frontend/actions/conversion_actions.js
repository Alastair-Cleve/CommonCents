var ConversionConstants = require('../constants/user_constants');
var ConversionUtil = require('../util/conversion_util');
var ConversionStore = require('../stores/conversion_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var ConversionActions = {
  receiveRatesForBase: function(rates_object) {
    AppDispatcher.dispatch({
      actionType: ConversionConstants.RECEIVE_RATES_OBJECT,
      rates_object: rates_object
    })
  }
};

module.exports = ConversionActions;
