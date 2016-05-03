var LineChart = require("react-chartjs").Line;
var React = require('react');
var ConversionActions = require("../actions/conversion_actions");
var ConversionStore = require('../stores/conversion_store');
var currency_constants = require('../constants/currency_constants');
window.moment = require('moment');

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        { data: [50, 59, 80, 81, 56, 55, 40] }
    ]
};

var options = {
        xAxes: [{
            display: false
        }]
    };

var Chart = React.createClass({

  getInitialState: function () {
    return({rates: []});
  },

  componentDidMount: function () {
    this.listener = ConversionStore.addListener(this.updateChart)
    ConversionActions.fetchHistoricalRates();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  updateChart: function() {
    
  },

  render: function() {
    return <div className="chart"><LineChart data={data} options={options} width="600" height="250"/></div>
  }
});

module.exports = Chart;
