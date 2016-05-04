var LineChart = require("react-chartjs").Line;
var React = require('react');
var ConversionActions = require("../actions/conversion_actions");
var ConversionStore = require('../stores/conversion_store');
var currency_constants = require('../constants/currency_constants');
var moment = require('moment');

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        { label: "30-Day Trend", data: [50, 59, 80, 81, 56, 55, 40] }
    ]
};

var options = {
        xAxes: [{
            display: false
        }]
    };

var Chart = React.createClass({

  getInitialState: function () {
    return({rates: ConversionStore.ratesObject()});
  },

  componentDidMount: function () {
    // this.listener = ConversionStore.addListener(this.updateChart)
    // setTimeout(ConversionActions.fetchHistoricalRates(ConversionStore.ratesObject().base, ConversionStore.ratesObject().date), 500);
    // ratesObject = ConversionStore.ratesObject();
    // ConversionActions.fetchHistoricalRates(ratesObject.base, ratesObject.date);
  },

  componentWillUnmount: function () {
    // this.listener.remove();
  },

  updateChart: function() {
    // ratesObject = ConversionStore.historicalObject();
    // this.setState({rates: rates.push(ratesObject[ConversionStore.toCurrency()])}, function() {
    //   if (this.state.rates.length < 30) {
    //     ConversionActions.fetchHistoricalRates(
    //       ratesObject.base,
    //       moment(ratesObject.date).subtract(1, "d").format("YYYY-MM-DD")
    //     );
    //   }
    // }.bind(this));
  },

  render: function() {
    return <div className="chart"><LineChart data={data} options={options} width="600" height="250"/></div>
  }
});

module.exports = Chart;
