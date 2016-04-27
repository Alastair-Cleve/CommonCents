var React = require("react");
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ConversionActions = require("../actions/conversion_actions");
var ConversionStore = require('../stores/conversion_store');
// var CurrentUserState = require("../mixins/current_user_state");
var currencies = require('../constants/currency_constants');


var ConversionWidget = React.createClass({
  getInitialState: function () {
    return({
      ratesObject: ConversionStore.ratesObject(),
      fromAmount: 0,
      toAmount: 0,
      fromCurrency: "USD",
      toCurrency: "EUR"
    });
  },

	componentDidMount: function () {
    ConversionStore.addListener(this.updateRatesWidget);
    ConversionActions.fetchRatesForBase(this.state.fromCurrency);
  },

  updateRatesWidget: function () {
    this.setState({ratesObject: ConversionStore.ratesObject()});
    var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
    var toAmount = this.state.fromAmount * exchangeRate;
    this.setState({toAmount: toAmount});
  },

  handleFromAmount: function (e) {
    this.setState({fromAmount: e.target.value});
    var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
    var toAmount = this.state.fromAmount * exchangeRate;
    this.setState({toAmount: toAmount});
  },

  handleToAmount: function (e) {
    this.setState({toAmount: e.target.value});
    var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
    var fromAmount = this.state.toAmount / exchangeRate;
    this.setState({fromAmount: fromAmount});
  },

  handleFromCurrency: function (e) {
    this.setState({fromCurrency: e.target.value});
    ConversionActions.fetchRatesForBase(this.state.fromCurrency);
  },

  handleToCurrency: function (e) {
    this.setState({toCurrency: e.target.value});
    var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
    var toAmount = this.state.fromAmount * exchangeRate;
    this.setState({fromAmount: fromAmount});
  },

  render: function () {
      return(
        <form>
          <h3>Conversion Widget</h3>
          <section>
            <label> You're sending exactly:
              <input type="text" onChange={this.handleFromAmount} value={this.state.fromAmount}/>
            </label>

            <label> Recipient gets:
              <input type="text" onChange={this.handleToAmount} value={this.state.toAmount}/>
            </label>

            <label> Which currency are you selling?:
              <select onChange={this.handleFromCurrency} value={this.state.fromCurrency}>
                {
                  currencies.map(function(currency, idx) {
                    return(<option key={idx} value={currency}>{currency}</option>)
                  })
                }
              </select>
            </label>
            <label> Which currency are you buying?:
              <select onChange={this.handleToCurrency} defaultValue={this.state.toCurrency}>
                {
                  currencies.map(function(currency, idx) {
                    return(<option key={idx} value={currency}>{currency}</option>)
                  })
                }
              </select>
            </label>
          </section>
        </form>
    );
  }
});

module.exports = ConversionWidget;
