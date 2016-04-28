var React = require("react");
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ConversionActions = require("../actions/conversion_actions");
var ConversionStore = require('../stores/conversion_store');
// var CurrentUserState = require("../mixins/current_user_state");
var currency_constants = require('../constants/currency_constants');

var ConversionWidget = React.createClass({
  getInitialState: function () {
    return({
      ratesObject: ConversionStore.ratesObject(),
      fromAmount: "0.00",
      toAmount: "0.00",
      fromCurrency: "USD",
      toCurrency: "EUR"
    });
  },

	componentDidMount: function () {
    ConversionStore.addListener(this.updateRatesWidget);
    ConversionActions.fetchRatesForBase(this.state.fromCurrency);
  },

  updateRatesWidget: function () {
    var rates = ConversionStore.ratesObject();
    if (!jQuery.isEmptyObject(rates)) {
      this.setState({ratesObject: ConversionStore.ratesObject()});
      var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
      var toAmount = (this.state.fromAmount * exchangeRate);
      this.setState({toAmount: toAmount.toFixed(2)});
    }
  },

  handleFromAmount: function (e) {
    // debugger;
    this.setState({fromAmount: e.target.value}, function() {
      var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
      var toAmount = this.state.fromAmount * exchangeRate;
      this.setState({toAmount: toAmount.toFixed(2)});
    });
  },

  handleToAmount: function (e) {
    this.setState({toAmount: e.target.value}, function() {
      var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
      var fromAmount = this.state.toAmount / exchangeRate;
      this.setState({fromAmount: fromAmount.toFixed(2)});
    });
  },

  handleFromCurrency: function (e) {
    this.setState({fromCurrency: e.target.value}, function() {
      ConversionActions.fetchRatesForBase(this.state.fromCurrency);
    });
  },

  handleToCurrency: function (e) {
    this.setState({toCurrency: e.target.value}, function() {
      var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
      var toAmount = this.state.fromAmount * exchangeRate;
      this.setState({toAmount: toAmount.toFixed(2)});
    });
  },

  render: function () {
      return(
        <form id="conversion" className="group">
          <section className="conversion">
            <label> You're sending exactly:
              <input type="text" onChange={this.handleFromAmount} value={this.state.fromAmount}/>
            </label> <br /><br />

            <label> Recipient gets:
              <input type="text" onChange={this.handleToAmount} value={this.state.toAmount}/>
            </label>
          </section>

          <section className="conversion">

              <select className="currency" onChange={this.handleFromCurrency} value={this.state.fromCurrency}>
                {
                  currency_constants.currencies.map(function(currency, idx) {
                    return(<option key={idx} value={currency}>{currency_constants.flags[idx]}&nbsp;&nbsp;&nbsp;{currency}</option>)
                  })
                }
              </select>


              <select className="currency" onChange={this.handleToCurrency} defaultValue={this.state.toCurrency}>
                {
                  currency_constants.currencies.map(function(currency, idx) {
                    return(<option key={idx} value={currency}>{currency_constants.flags[idx]}&nbsp;&nbsp;&nbsp;{currency}</option>)
                  })
                }
              </select>

          </section>
        </form>
    );
  }
});

module.exports = ConversionWidget;
