//React
var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
//Components
var LoginForm = require('./components/LoginForm');
var ConversionWidget = require('./components/ConversionWidget');
//Mixins - Temporarily Unused - Refactor
var CurrentUserState = require('./mixins/current_user_state');
//Modal for Login
var Modal = require('react-modal');
var Header = require('./components/Header');
var Transfers = require('./components/Transfers');
var Dashboard = require('./components/Dashboard');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <header className="header">
          <nav className="header-nav group">

            <h1 className="header-logo">
              <a href="#">Common&#xFFE0;ents</a>
            </h1>

            <ul className="header-list group">
              <li><Header /></li>
            </ul>

          </nav>
        </header>
        <div id="tagline">
          <p>{"SEND MONEY WITH THE REAL EXCHANGE RATE. "}</p>
          <p>{"Banks hide huge charges when you send money abroad. With CommonCents, you save up to 90%. Problem solved, money saved."}</p>
        </div>
       <ConversionWidget/>
      </div>
    );
  }
});

//Note: LoginForm goes below this.props.children

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/transfer" component={Transfers}></Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  Modal.setAppElement(document.body);
  ReactDOM.render(Router, root);
});
