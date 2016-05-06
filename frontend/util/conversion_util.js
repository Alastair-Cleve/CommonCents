var AppDispatcher = require('../dispatcher/dispatcher');

var ConversionUtil = {
	fetchRatesForBase: function(base, success){
		console.log("In Util: ", base);
		$.ajax({
			url: "https://api.fixer.io/latest?base=" + base,
			type: "GET",
			success: success
		});
	},

	fetchHistoricalRates: function(base, date, success){
		$.ajax({
			url: "https://api.fixer.io/" + date + "/?base=" + base,
			type: "GET",
			success: success
		});
	}

};

module.exports = ConversionUtil;
