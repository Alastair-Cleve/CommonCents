var AppDispatcher = require('../dispatcher/dispatcher');

var TransfersApiUtil = {
	post: function(options){
		$.ajax({
			url: options.url,
			type: "post",
			data: {transfer: options.transfer},
			success: options.success,
			error: options.error
		});
	},

  getTransfers:

  getTransfer:
  //
	// logout: function(success, error){
	// 	$.ajax({
	// 		url: '/api/session',
	// 		method: 'delete',
	// 		success: success,
	// 		error: error
	// 	});
	// },
	// fetchCurrentUser: function(success, error){
	// 	$.ajax({
	// 		url: '/api/session',
	// 		method: 'get',
	// 		success: success,
	// 		error: error
	// 	});
	// }
};

module.exports = TransfersApiUtil;
