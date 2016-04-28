var AppDispatcher = require('../dispatcher/dispatcher');
// var ConversionActions = require('../actions/conversion_actions');

var ConversionUtil = {
	fetchRatesForBase: function(base, success){
		$.ajax({
			url: "https://api.fixer.io/latest?base=" + base,
			type: "GET",
			success: success
		});
	}


};

module.exports = ConversionUtil;
