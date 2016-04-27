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

var App = React.createClass({
  render: function(){
    return (
      <div>
       <header><h1>Common&#xFFE0;ents</h1></header>
       <LoginForm/>
       <ConversionWidget/>
      </div>
    );
  }
});

//Note: LoginForm goes below this.props.children

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
