var React = require("react");
var TransfersActions = require("../actions/transfers_actions");
var TransfersStore = require('../stores/transfers_store');
var ConversionStore = require('../stores/conversion_store');
var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');
var transfers_constants = require('../constants/transfers_constants');
var ConversionWidget = require('./ConversionWidget');
var hashHistory = require('react-router').hashHistory;

var Transfers = React.createClass({
  getInitialState: function () {
    return({
      transfers: [],
      transferor_id: 0,
      transferee_id: 0,
      amount: 0.0,
      currency: "EUR",
      searchString: "",
      usersLists: []
    });
  },

	componentWillMount: function () {
    this.userListener = UserStore.addListener(this.updateUsersList);
    UserActions.fetchCurrentUser(); //This precedes fetchTransfers so that UserStore.currentUser().id in updateUsersList works properly
    this.transferListener = TransfersStore.addListener(this.updateTransfers);
    this.conversionListener = ConversionStore.addListener(this.updateConfirmation);
    TransfersActions.fetchTransfers();
    UserActions.fetchUsers();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.transferListener.remove();
    this.conversionListener.remove();
  },

  updateTransfers: function () {
    this.setState({transfers: TransfersStore.all()});
  },

  updateUsersList: function () {
    this.setState({
      transferor_id: UserStore.currentUser().id,
      usersLists: UserStore.all()
    });
  },

  updateConfirmation: function () {
    this.setState({
      amount: ConversionStore.toAmount(),
      currency: ConversionStore.toCurrency()
    });
  },

  handleAmount: function (e) {
    e.preventDefault();
    this.setState({
      amount: ConversionStore.toAmount(),
      currency: ConversionStore.toCurrency()
    });
  },

  handleChange: function(e) {
    this.setState({searchString: e.target.value});
  },

  handleClick: function(e) {
    this.setState({searchString: e.target.textContent});
  },

  handleConfirmation: function(e) {
    e.preventDefault();
    this.setState({transferee_id: UserStore.find_by_username(this.state.searchString).id}, function() {
      TransfersActions.createTransfer({
        transferor_id: this.state.transferor_id,
        transferee_id: this.state.transferee_id,
        amount: parseFloat(this.state.amount),
        currency: this.state.currency
      });
      hashHistory.push('/dashboard');
    });
  },

  handleLogOut: function () {
    UserActions.logout();
    hashHistory.push('/');
  },

  render: function () {
    var libraries = this.state.usersLists;
    var searchString = this.state.searchString.trim().toLowerCase();
    if (searchString.length === 0) {
      libraries = [];
    } else if (searchString.length > 1) {
      libraries = libraries.filter(function(el){
        return el.username.toLowerCase().match(searchString);
      });
      if (libraries.length === 1 && libraries[0].username.toLowerCase() === searchString) {
        libraries = [];
      }
    }
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
          <div className="dashboard group">

            <div className="center">
              <label> <h3>How much would you like to transfer?</h3>
                <div id="transfer-widget"><ConversionWidget /></div>
              </label>
            </div>
            <div className="center transfer-clear">
              <label> <h3>Who is receiving this transfer?</h3>
                <br/><input id="transferee-search" type="text"
                       onChange={this.handleChange}
                       value={this.state.searchString}
                       placeholder="Search for other users">
                </input>
                <ul>
                  {libraries.map(function(el){
                    return <li key={el.id} onClick={this.handleClick}>{el.username}</li>;
                  }.bind(this))}
                </ul>
              </label>
            </div><br/>
            <div className="center transfer-clear">
              <label> <h3>Review</h3>
                You are transferring {this.state.amount} {this.state.currency} to {this.state.searchString}.
                <br /><br /><button className="btn" onClick={this.handleConfirmation}>Confirm</button>
              </label>
            </div>

          </div>
        </div>
      </div>
    )
  }
});

module.exports = Transfers;
