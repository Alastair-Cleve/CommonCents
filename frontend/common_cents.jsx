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
var Header = require('./components/Header');
var Transfers = require('./components/Transfers');
var Dashboard = require('./components/Dashboard');
var Chart = require('./components/Chart');
//Mixins - Temporarily Unused - Refactor
var CurrentUserState = require('./mixins/current_user_state');
//Modal for Login
var Modal = require('react-modal');

var App = React.createClass({

  render: function(){
    return (
      <div>
        <div className="image-div group">
          <header className="header">
            <nav className="header-nav center group">

              <a className="header-logo" href="#">Common&#xFFE0;ents</a>

              <ul className="header-list group">
                <li><Header /></li>
              </ul>

            </nav>
          </header>
          <div className="center group content-section">
            <div className="tagline">
              <p>{"SEND MONEY WITH THE REAL EXCHANGE RATE. "}</p>
              <p className="sub-header">{"Banks hide huge charges when you send money abroad. With CommonCents, you save up to 90%. Problem solved, money saved."}</p>
            </div>
            <ConversionWidget/>
          </div>
          <div className="center">
            <button className="btn submit-btn" id="transfer-btn">Make a Transfer</button>
          </div>
        </div>

        <div className="center group">
          <Chart/>
        </div>
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
