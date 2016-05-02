var React = require("react");
var TransfersActions = require("../actions/transfers_actions");
var TransfersStore = require('../stores/transfers_store');
var ConversionStore = require('../stores/conversion_store');
var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');
var transfers_constants = require('../constants/transfers_constants');
var ConversionWidget = require('./ConversionWidget');

var Transfers = React.createClass({
  getInitialState: function () {
    return({
      transfers: [],
      transferor_id: 0,
      transferee_id: 0,
      amount: 0,
      currency: "EUR",
      searchString: "",
      usersLists: []
    });
  },

	componentDidMount: function () {
    TransfersStore.addListener(this.updateTransfers);
    UserStore.addListener(this.updateUsersList);
    ConversionStore.addListener(this.updateConfirmation);
    TransfersActions.fetchTransfers();
    UserActions.fetchCurrentUser();
    UserActions.fetchUsers();
  },

  updateTransfers: function () {
    this.setState({
      transferor_id: UserStore.currentUser().id,
      transfers: TransfersStore.all()
    })
  },

  updateUsersList: function () {
    this.setState({usersLists: UserStore.all()})
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
    this.setState({transferee_id: this.state.usersLists[0].id}, function() {
      TransfersActions.createTransfer({
        transferor_id: this.state.transferor_id,
        transferee_id: this.state.transferee_id,
        amount: this.state.amount,
        currency: this.state.currency
      });
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
      <div className="transfer">
        <label> How much would you like to transfer?
          <ConversionWidget />
          <button onClick={this.handleAmount}>Continue</button>
        </label>
        <label> Who is receiving this transfer?
          <input type="text"
                 onChange={this.handleChange}
                 value={this.state.searchString}
                 placeholder="Search for other users">
          </input>
          <ul>
            {libraries.map(function(el){
              return <li onClick={this.handleClick}>{el.username}</li>;
            }.bind(this))}
          </ul>
        </label>
        <label> Confirmation
          You are transferring {this.state.amount} {this.state.currency} to {this.state.searchString}.
          <button onClick={this.handleConfirmation}>Confirm</button>
        </label>
      </div>
    )
  }
});

module.exports = Transfers;
