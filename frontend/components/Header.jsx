var React = require('react');
var Modal = require('react-modal');
var style = require('../../app/assets/stylesheets/Header.js');
var LoginForm = require('./LoginForm');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');
var hashHistory = require('react-router').hashHistory;

var Header = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false,
             label: "Log In / Sign In",
             currentUser: UserStore.currentUser(),
       			 userErrors: UserStore.errors(),
             salutation: ""});
  },
  componentDidMount: function(){
    this.listener = UserStore.addListener(this.updateUser);
    if (typeof UserStore.currentUser() === 'undefined') {
      UserActions.fetchCurrentUser();
    }
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  updateUser: function(){
    this.setState({
      currentUser: UserStore.currentUser(),
      userErrors: UserStore.errors()
    }, function() {
      if (this.state.currentUser) {
        this.setState(
          {label: "Log Out",
           salutation: "Hello, " + this.state.currentUser.username + "! ",
           modalOpen: false}, function() {
             hashHistory.push('/dashboard');
           })
      } else {
        this.setState({label: "Log In / Sign In", salutation: ""})
      }
    });
  },
  _handleClick: function (e){
    if (this.state.label === "Log Out") {
      e.preventDefault();
      UserActions.logout();
      style['content']['opacity'] = 0;
    } else {
      this.setState({ modalOpen: true });
    }
  },
  onModalClose: function () {
    style['content']['opacity'] = 0;
    this.setState({ modalOpen: false });
  },
  onModalOpen: function () {
    style['content']['opacity'] = 100;
  },
  render: function (){
    return(
      <div>
        {this.state.salutation}
        <div id="login" onClick={this._handleClick}>{this.state.label}</div>
        <Modal className="modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.onModalClose}
          style={style}
          onAfterOpen={this.onModalOpen}>
          <p></p><button id="modal" onClick={this.onModalClose}>X</button><p/>
          <LoginForm/>
        </Modal>
      </div>
    );
  }
});

module.exports = Header;
