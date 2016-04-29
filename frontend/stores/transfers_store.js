var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var TransfersStore = new Store(AppDispatcher);
var _transfers = {};
var _errors = [];

TransfersStore.all = function () {
  return (Object.keys(_transfers).map(function(transfer_id) {
    return (_transfers[transfer_id]);
  }));
};

TransfersStore.addTransfers = function(transfers) {
  transfers.forEach(function(transfer) {
    _transfers[transfer.id] = transfer;
  })
};

TransferStore.addTransfer = function(transfer) {
  _transfers[transfer.id] = transfer;
};

TransfersStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "RECEIVE_TRANSFERS":
    	TransfersStore.addTransfers(payload.transfers);
      break;
    case "RECEIVE_TRANSFER"
      TransfersStore.addTransfer(payload.transfer);
      break;
    case "ERROR"
      TransfersStore.setErrors(payload.errors);
      break;
  }
  ConversionStore.__emitChange();
};

TransfersStore.setErrors = function(errors){
  _errors = errors;
};

TransfersStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
};

module.exports = TransfersStore;
