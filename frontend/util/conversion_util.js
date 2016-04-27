var AppDispatcher = require('../dispatcher/dispatcher');
var ConversionActions = require('../actions/conversion_actions');

var ConversionUtil = {
	getRatesForBase: function(base){
		$.ajax({
			url: "http://api.fixer.io/latest?base=" + base,
			type: "get",
			success: ConversionActions. ,
			error: options.error
		});
	}


};

module.exports = ConversionUtil;
