var React = require("react");
var TransfersActions = require("../actions/transfers_actions");
var TransfersStore = require('../stores/transfers_store');
var ConversionStore = require('../stores/conversion_store');
var UserStore = require('../stores/user_store');
var transfers_constants = require('../constants/transfers_constants');
var ConversionWidget = require('./ConversionWidget');

var Transfers = React.createClass({
  getInitialState: function () {
    return({
      transferor_id: 0,
      transferee_id: 0,
      amount: 0,
      currency: "EUR"
    });
  },

	componentDidMount: function () {
    TransfersStore.addListener(this.updateTransfers);
    TransfersActions.fetchTransfers();
  },

  updateTransfers: function () {
    this.setState({transfers: TransfersStore.all()})
  },

  handleAmount: function (e) {
    e.preventDefault();
    this.setState({
      transferor_id: UserStore.currentUser.id,
      amount: ConversionStore.toAmount(),
      currency: ConversionStore.toCurrency()
     })
  },

  render: function () {
    return(
      <div className="transfer">
        <label > How much would you like to transfer?
          <ConversionWidget />
          <button onClick={this.handleAmount}>Continue</button>
        </label>
      </div>
    )
  }
});

module.exports = Transfers;
