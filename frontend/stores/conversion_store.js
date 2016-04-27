var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ConversionStore = new Store(AppDispatcher);



module.exports = ConversionStore;
