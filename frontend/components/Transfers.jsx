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
    UserStore.addListener(this.updateUsersList)
    TransfersActions.fetchTransfers();
    UserActions.fetchUsers();
  },

  updateTransfers: function () {
    this.setState({transfers: TransfersStore.all()})
  },

  updateUsersList: function () {
    this.setState({usersLists: UserStore.all()})
  },

  handleAmount: function (e) {
    e.preventDefault();
    this.setState({
      transferor_id: UserStore.currentUser.id,
      amount: ConversionStore.toAmount(),
      currency: ConversionStore.toCurrency()
     })
  },

  handleChange: function(e) {
    this.setState({searchString: e.target.value});
  },

  handleClick: function(e) {
    this.setState({searchString: event.target.textContent});
  },

  render: function () {
    var libraries = this.state.usersLists;
    var searchString = this.state.searchString.trim().toLowerCase();
    if (searchString.length > 0) {
      libraries = libraries.filter(function(el){
        return el.username.toLowerCase().match(searchString);
      });
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
      </div>
    )
  }
});

module.exports = Transfers;
