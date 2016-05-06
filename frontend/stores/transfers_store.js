var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var TransfersStore = new Store(AppDispatcher);
var _transfers = {};
var _errors = [];

TransfersStore.all = function () {
  return _transfers
};

TransfersStore.addTransfers = function(transfers) {
  _transfers = transfers
};

TransfersStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "RECEIVE_TRANSFERS":
    	TransfersStore.addTransfers(payload.transfers);
      TransfersStore.__emitChange();
      break;
    case "ERROR":
      TransfersStore.setErrors(payload.errors);
      TransfersStore.__emitChange();
      break;
  }
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
