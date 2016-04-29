var React = require("react");
var TransfersActions = require("../actions/transfers_actions");
var TransfersStore = require('../stores/transfers_store');
var transfers_constants = require('../constants/transfers_constants');

var Transfer = React.createClass({
  getInitialState: function () {
    return({
      transfers = [];
    });
  },

	componentDidMount: function () {
    TransfersStore.addListener(this.updateTransfers);
    TransfersActions.fetchTransfers();
  },

  updateTransfers: function () {
    this.setState({transfers: TransfersStore.all()})
  },


  render: function () {
    return(
      <form>
        <label> How much would you like to transfer?

        </label>
      </form>
    )
  }
});

module.exports = Transfer;
