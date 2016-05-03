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
    this.transferListener = TransfersStore.addListener(this.updateTransfers);
    this.userListener = UserStore.addListener(this.updateUser);
    TransfersActions.fetchTransfers();
    UserActions.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.transferListener.remove();
    this.userListener.remove();
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
          <nav className="header-nav center group">

            <a className="header-logo" href="#">Common&#xFFE0;ents</a>

            <ul className="header-list group">
              <li><div id="login" onClick={this.handleLogOut}>Log Out</div></li>
            </ul>

          </nav>
        </header>

        <div className="center">
          <div className="dashboard">
            <h1>Welcome to your dashboard!</h1><br/>
              <table className="center">
                <tbody>
                  <tr><th>Date</th><th>Time</th><th>Recipient</th><th>Amount</th><th>Currency</th></tr>
                  {
                    this.state.transfers.reverse().map(function(transfer) {
                      return(<tr key={transfer.id}><td>{transfer.date}</td><td>{transfer.time}</td><td>{transfer.recipient}</td><td>{transfer.amount}</td><td>{transfer.currency}</td></tr>);
                    })
                  }
                </tbody>
              </table>
          </div><br/>
          <button className="btn submit-btn" onClick={this.handleTransfer}>Make a Transfer</button>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
