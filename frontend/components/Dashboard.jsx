var React = require("react");
var TransfersActions = require('../actions/transfers_actions');
var TransfersStore = require('../stores/transfers_store');
var hashHistory = require('react-router').hashHistory;
var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');


var Dashboard = React.createClass({
  getInitialState: function () {
    return({
      transfers: [],
      currentUser: UserStore.currentUser(),
      userErrors: UserStore.errors()
    });
  },

	componentDidMount: function () {
    TransfersStore.addListener(this.updateTransfers);
    UserStore.addListener(this.updateUser);
    TransfersActions.fetchTransfers();
    UserActions.fetchCurrentUser();
  },

  updateTransfers: function () {
    this.setState({transfers: TransfersStore.all()});
  },

  updateUser: function(){
    this.setState({
      currentUser: UserStore.currentUser(),
      userErrors: UserStore.errors()
    });
  },

  handleTransfer: function () {
    hashHistory.push('/transfer');
  },

  handleLogOut: function () {
    UserActions.logout();
    hashHistory.push('/');
  },

  render: function () {
    return(
      <div>
        <header className="header">
          <nav className="header-nav group">

            <h1 className="header-logo">
              <a href="#">Common&#xFFE0;ents</a>
            </h1>

            <ul className="header-list group">
              <li><div id="login" onClick={this.handleLogOut}>Log Out</div></li>
            </ul>

          </nav>
        </header>

        <h1 className="dashboard">Welcome to your dashboard!</h1>
        <p>
          <table className="dashboard">
            <tr><th>Date</th><th>Time</th><th>Recipient</th><th>Amount</th><th>Currency</th></tr>
            {
              this.state.transfers.reverse().map(function(transfer) {
                return(<tr><td>{transfer.date}</td><td>{transfer.time}</td><td>{transfer.recipient}</td><td>{transfer.amount}</td><td>{transfer.currency}</td></tr>);
              })
            }
          </table>
        </p>
        <button onClick={this.handleTransfer}>Make a Transfer</button>
      </div>
    );
  }
});

module.exports = Dashboard;
