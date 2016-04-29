var TransfersConstants = require('../constants/transfers_constants');
var TransfersUtil = require('../util/transfers_api_util');
var TransfersStore = require('../stores/transfers_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var TransfersActions = {
  receiveTransfers: function (transfers) {
    AppDispatcher.dispatch({
      actionType: TransfersConstants.RECEIVE_TRANSFERS,
      transfers: transfers
    })
  },

  receiveTransfer: function (transfer) {
    AppDispatcher.dispatch({
      actionType: TransfersConstants.RECEIVE_TRANSFER,
      transfer: transfer
    })
  },

  fetchTransfers: function () {
    TransfersUtil.fetchTransfers({"url": "/api/transfers",
                                  "success": this.receiveTransfers,
                                  "error": this.handleError});
  },

  createTransfer: function (transfer) {
    TransfersUtil.createTransfer({"url": "/api/transfers",
                                  "transfer": transfer,
                                  "success": this.receiveTransfer,
                                  "error": this.handleError});
  },

  handleError: function(error) {
    // debugger;
    AppDispatcher.dispatch({
      actionType: TransfersConstants.ERROR,
      errors: error.responseJSON.errors
    });
  },

};

module.exports = TransfersActions;
