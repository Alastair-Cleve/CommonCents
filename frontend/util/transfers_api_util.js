var AppDispatcher = require('../dispatcher/dispatcher');

var TransfersApiUtil = {
	createTransfer: function(options){
		$.ajax({
			url: options.url,
			type: "post",
			data: {transfer: options.transfer},
			success: options.success,
			error: options.error
		});
	},

  fetchTransfers: function (options) {
	  $.ajax({
			url: options.url,
			type: "get",
			success: options.success,
			error: options.error
		});
	}
};

module.exports = TransfersApiUtil;
