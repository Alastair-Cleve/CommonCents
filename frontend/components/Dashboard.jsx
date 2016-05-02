var React = require("react");
// var UserActions = require('../actions/user_actions');
// var UserStore = require('../stores/user_store');
var TransfersActions = require('../actions/transfers_actions');
var TransfersStore = require('../stores/transfers_store');

var Dashboard = React.createClass({
  getInitialState: function () {
    return({
      transfers: [],
    });
  },

	componentDidMount: function () {
    // UserStore.addListener(this.updateUsersList);
    // UserActions.fetchCurrentUser(); //This precedes fetchTransfers so that UserStore.currentUser().id in updateUsersList works properly
    TransfersStore.addListener(this.updateTransfers);
    TransfersActions.fetchTransfers();
    // UserActions.fetchUsers();
  },

///here

  updateTransfers: function () {
    this.setState({transfers: TransfersStore.all()});
  },

  // updateUsersList: function () {
  //   this.setState({
  //     transferor_id: UserStore.currentUser().id,
  //     usersLists: UserStore.all()
  //   });
  // },
  //
  // updateConfirmation: function () {
  //   this.setState({
  //     amount: ConversionStore.toAmount(),
  //     currency: ConversionStore.toCurrency()
  //   });
  // },
  //
  // handleAmount: function (e) {
  //   e.preventDefault();
  //   this.setState({
  //     amount: ConversionStore.toAmount(),
  //     currency: ConversionStore.toCurrency()
  //   });
  // },
  //
  // handleChange: function(e) {
  //   this.setState({searchString: e.target.value});
  // },
  //
  // handleClick: function(e) {
  //   this.setState({searchString: e.target.textContent});
  // },
  //
  // handleConfirmation: function(e) {
  //   e.preventDefault();
  //   this.setState({transferee_id: UserStore.find_by_username(this.state.searchString).id}, function() {
  //     TransfersActions.createTransfer({
  //       transferor_id: this.state.transferor_id,
  //       transferee_id: this.state.transferee_id,
  //       amount: this.state.amount,
  //       currency: this.state.currency
  //     });
  //   });
  // },

  render: function () {
    return(
      <div><h1 className="dashboard">Your Dashboard</h1>
        <table className="dashboard">
          <tr><th>Date</th><th>Time</th><th>Recipient</th><th>Amount</th><th>Currency</th></tr>
          {
            this.state.transfers.map(function(transfer) {
              return(<tr><td>{transfer.date}</td><td>{transfer.time}</td><td>{transfer.recipient}</td><td>{transfer.amount}</td><td>{transfer.currency}</td></tr>);
            })
          }
        </table>
      </div>
    );
  }
});

module.exports = Dashboard;
