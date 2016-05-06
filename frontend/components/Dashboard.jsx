var React = require("react");
var TransfersActions = require('../actions/transfers_actions');
var TransfersStore = require('../stores/transfers_store');
var hashHistory = require('react-router').hashHistory;
var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');
var Sidebar = require('./sidebar');


var Dashboard = React.createClass({
  getInitialState: function () {
    return({
      transfers: {"transfers": [], "received_transfers": [], "current_user": []},
      currentUser: "",
      userErrors: UserStore.errors()
    });
  },

	componentDidMount: function () {
    // this.userListener = UserStore.addListener(this.updateUser);
    // UserActions.fetchCurrentUser();
    if (window.transferVariables) {
      hashHistory.push("/transfer");
    }
    this.transferListener = TransfersStore.addListener(this.updateTransfers);
    TransfersActions.fetchTransfers();
  },

  componentWillUnmount: function () {
    this.transferListener.remove();
    // this.userListener.remove();
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
    // setTimeout(hashHistory.push('/'), 500);
  },

  render: function () {
    // window.default_currency = this.state.transfers['current_user']['default_currency'];
    console.log(this.state.transfers['current_user']);
    console.log(this.state.transfers['current_user']['default_currency']);

    if (this.state.transfers["transfers"].length > 0) {
      var transfers_table = this.state.transfers["transfers"].reverse().map(function(transfer) {
        return(<tr key={transfer.id}><td>{transfer.date}</td><td>{transfer.time + " GMT"}</td><td>{transfer.recipient}</td><td>{transfer.amount}</td><td>{transfer.currency}</td></tr>);
      });
      var transfers_table_empty = "";
    } else {
      var transfers_table = "";
      var transfers_table_empty = <h3 className="center">You have not made any transfers yet.</h3>
    }

    if (this.state.transfers["received_transfers"].length > 0) {
      var received_transfers_table =  this.state.transfers["received_transfers"].reverse().map(function(transfer) {
        return(<tr key={transfer.id}><td>{transfer.date}</td><td>{transfer.time + " GMT"}</td><td>{transfer.transferor}</td><td>{transfer.amount}</td><td>{transfer.currency}</td></tr>);
      });
      var received_transfers_table_empty = "";
    } else {
      var received_transfers_table = "";
      var received_transfers_table_empty = <h3 className="center">You have not received any transfers yet.</h3>
    }

    return(
      <div>
        <Sidebar default_currency={this.state.transfers['current_user']['default_currency']} />

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
            <h1>Welcome to your dashboard, {this.state.transfers['current_user']['username']}!</h1><br/>
              <h2 id="transfer-title">Your default currency is: {this.state.transfers['current_user']['default_currency']}</h2><br/>

              <div>
              <button className="btn submit-btn" id="transfer-btn" onClick={this.handleTransfer}>Make a Transfer</button>
              </div><br/>

              <h2>Transfers Sent</h2><br/>
              <table className="center">
                <tbody>
                  <tr><th>Date</th><th>Time</th><th>Recipient</th><th>Amount</th><th>Currency</th></tr>
                  {
                    transfers_table
                  }
                </tbody>
              </table>
                  {transfers_table_empty}

              <br /><br /><h2>Transfers Received</h2><br/>
              <table className="center">
                <tbody>
                  <tr><th>Date</th><th>Time</th><th>Sender</th><th>Amount</th><th>Currency</th></tr>
                  {
                    received_transfers_table
                  }
                </tbody>
              </table>
                  {received_transfers_table_empty}

          </div><br/>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
