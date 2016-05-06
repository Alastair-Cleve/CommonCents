var Menu = require('react-burger-menu').slide;
var React = require('react');

var ConversionActions = require('../actions/conversion_actions');
var TransfersStore = require('../stores/transfers_store');
var ConversionStore = require('../stores/conversion_store');
var CurrencyConstants = require('../constants/currency_constants');

var numberWithCommas = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var Sidebar = React.createClass({

  getInitialState: function () {
    return({
      default_currency: this.props.default_currency,

      myRates: {
        base: "",
        date: "",
        rates: {  "AUD": 1.5266,
                  "BGN": 1.9558,
                  "BRL": 4.0282,
                  "CAD": 1.4665,
                  "CHF": 1.1018,
                  "CNY": 7.441,
                  "CZK": 27.028,
                  "DKK": 7.4401,
                  "EUR": 1.000,
                  "GBP": 0.7886,
                  "HKD": 8.8775,
                  "HRK": 7.515,
                  "HUF": 312.84,
                  "IDR": 15260.95,
                  "ILS": 4.3221,
                  "INR": 76.0745,
                  "JPY": 122.51,
                  "KRW": 1333.95,
                  "MXN": 20.2155,
                  "MYR": 4.5819,
                  "NOK": 9.2985,
                  "NZD": 1.6577,
                  "PHP": 54.171,
                  "PLN": 4.4234,
                  "RON": 4.5035,
                  "RUB": 75.0559,
                  "SEK": 9.2575,
                  "SGD": 1.5531,
                  "THB": 40.191,
                  "TRY": 3.3166,
                  "USD": 1.1439,
                  "ZAR": 17.0751
      }}
    });
  },
  componentDidMount: function () {
    this.listener = ConversionStore.addListener(this.updateRates);
    ConversionActions.fetchRatesForBase(this.state.default_currency);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  componentWillReceiveProps: function (nextProps) {
    ConversionActions.fetchRatesForBase(nextProps.default_currency);
    this.setState({default_currency: nextProps.default_currency});
  },
  updateRates: function () {
    this.setState({ myRates: ConversionStore.ratesObject() });
  },
  showSettings: function(event) {
    event.preventDefault();
  },
  render: function() {
    var localRates = this.state.myRates;
    var pairs = Object.keys(localRates["rates"]);

    return (
      <Menu styles={styles}>
        <h1>Today's Rates</h1><br/>
        <h3>1&nbsp;&nbsp;{CurrencyConstants["pairs"][this.props.default_currency]}&nbsp;&nbsp;{this.props.default_currency} buys:</h3><br/>
        <table>
          <tbody>
          {
            pairs.sort().map(function(currency) {
              return (<tr className="sidebar-row"><td>{numberWithCommas(localRates["rates"][currency].toFixed(2))}</td><td>{CurrencyConstants["pairs"][currency]}&nbsp;&nbsp;{currency}</td></tr>)
            })
          }
          </tbody>
        </table>
     </Menu>
    );
  }
});

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '0px',
    top: '100px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 4.0em',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    overflowY: 'scroll'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

module.exports = Sidebar;
