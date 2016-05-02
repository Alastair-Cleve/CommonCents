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
      <div className="transfer" >
        <label> How much would you like to transfer?
          <ConversionWidget className="transfer"/>
          <button onClick={this.handleAmount}>Continue</button>
        </label><br/><br />
        <label> Who is receiving this transfer?
          <br/><input type="text"
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
        <label> Confirmation
          You are transferring {this.state.amount} {this.state.currency} to {this.state.searchString}.
          <br /><button onClick={this.handleConfirmation}>Confirm</button>
        </label>
      </div>
    )
  }
});

module.exports = Transfers;
