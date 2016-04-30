var AppDispatcher = require('../dispatcher/dispatcher');

var UserApiUtil = {
	fetchUsers: function(success, error){
		$.ajax({
			url: '/api/user',
			type: "get",
			success: success,
			error: error
		})
	},
	post: function(options){
		$.ajax({
			url: options.url,
			type: "post",
			data: {user: options.user},
			success: options.success,
			error: options.error
		});
	},
	logout: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success: success,
			error: error
		});
	},
	fetchCurrentUser: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'get',
			success: success,
			error: error
		});
	}
};

module.exports = UserApiUtil;
