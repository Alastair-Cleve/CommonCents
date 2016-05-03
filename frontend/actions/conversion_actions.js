var ConversionConstants = require('../constants/conversion_constants');
var ConversionUtil = require('../util/conversion_util');
var ConversionStore = require('../stores/conversion_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var ConversionActions = {
  receiveRatesForBase: function(rates_object) {
    AppDispatcher.dispatch({
      actionType: ConversionConstants.RECEIVE_RATES_OBJECT,
      ratesObject: rates_object
    })
  },

  fetchRatesForBase: function(base) {
    ConversionUtil.fetchRatesForBase(base, this.receiveRatesForBase);
  },

  fetchHistoricalRates: function(date, base) {

  },

  addToAmountToTransfersStore: function(amount) {
    AppDispatcher.dispatch({
      actionType: ConversionConstants.RECEIVE_TO_AMOUNT,
      amount: amount
    })
  },

  addToCurrencyToTransfersStore: function(currency) {
    AppDispatcher.dispatch({
      actionType: ConversionConstants.RECEIVE_TO_CURRENCY,
      currency: currency
    })
  }
};

module.exports = ConversionActions;
