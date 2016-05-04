var React = require("react");
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require("../actions/user_actions");
var UserStore = require('../stores/user_store');
// var CurrentUserState = require("../mixins/current_user_state");
var currency_constants = require('../constants/currency_constants');

var currencies = ["EUR", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK",
  "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW",
  "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD",
  "THB", "TRY", "USD", "ZAR"];


var LoginForm = React.createClass({
	// mixins: [CurrentUserState],
	getInitialState: function(){
		return ({form: "signup",
            username: "",
            password: "",
            default_currency: "",
            currentUser: UserStore.currentUser(),
      			userErrors: UserStore.errors(),
            show_currency: true
      });
	},
  componentDidMount: function(){
    this.listener = UserStore.addListener(this.updateUser);
    if (typeof UserStore.currentUser() === 'undefined') {
      UserActions.fetchCurrentUser();
    }
  },
  componentWillUnmount: function(){
    this.listener.remove();
  },
  updateUser: function(){
    this.setState({
      currentUser: UserStore.currentUser(),
      userErrors: UserStore.errors()
    });
  },
	setForm: function(e){
    if (e.target.value === "signup") {
      this.setState({form: e.target.value, show_currency: true});
    } else {
      this.setState({form: e.target.value, show_currency: false})
    }
	},
	handleSubmit: function(e){
		e.preventDefault();
		UserActions[this.state.form]({
			username: this.state.username,
			password: this.state.password,
      default_currency: this.state.default_currency
		});
	},
  handleDemo: function(e){
    e.preventDefault();
    UserActions.login({
      username: "guest",
      password: "password"
    });
  },
  handleUsername: function(e){
    this.setState({username: e.target.value});
  },
  handlePassword: function(e){
    this.setState({password: e.target.value});
  },
  handleDefaultCurrency: function(e){
    this.setState({default_currency: e.target.value});
  },
	logout: function(e){
		e.preventDefault();
		UserActions.logout();
	},
	greeting: function(){
		if (!this.state.currentUser) {
			return;
		}
		return (
			<div>
				<input type="submit" value="logout" onClick={this.logout}/>
			</div>
		);
	},
	errors: function(){
		if (!this.state.userErrors){
			return;
		}
		var self = this;
		return (<ul>
		{
			Object.keys(this.state.userErrors).map(function(key, i){
				return (<li key={i}>{self.state.userErrors[key]}</li>);
			})
		}
		</ul>);
	},
	form: function(){
		if (this.state.currentUser) {
			return;
		}
    if (this.state.show_currency) {
      return(
        <div className="center">
  				<form>
            <h1><p>Create a free account!</p></h1>
  					<section>
  						<div className="center">
                <label> Username:
    							<input type="text" onChange={this.handleUsername}/>
    						</label>
  						</div>

              <div className="center">
                <label> Password:
  							  <input type="password" onChange={this.handlePassword}/>
  						  </label>
  						</div><br/>

              <div className="center">
                <label> Default Currency:
                  <select className="currency act-creation" onChange={this.handleDefaultCurrency} defaultValue="USD">
                    {
                      currency_constants.currencies.map(function(currency, idx) {
                        return(<option key={idx} value={currency}>{currency_constants.flags[idx]}&nbsp;&nbsp;&nbsp;{currency}</option>)
                      })
                    }
                  </select>
                </label>
              </div>
  					</section><br/>

  					<section>
              <input type="radio" name="intro" onClick={this.setForm} value="signup" checked="checked" />Signup
              <input type="radio" name="intro" onClick={this.setForm} value="login" />Login
  					</section><br/>

  					<input className="btn submit-btn" readOnly={true} type="Submit" value="Submit" onClick={this.handleSubmit}/><br/><br/>
            <input className="btn submit-btn" readOnly={true} type="Submit" value="Demo" onClick={this.handleDemo}/>
  				</form>
        </div>
      )
    } else {
       return(
        <div className="center">
          <form>
            <h1><p>Welcome back!</p></h1>
            <section>
              <div className="center">
                <label> Username:
                  <input type="text" onChange={this.handleUsername}/>
                </label>
              </div>

              <div className="center">
                <label> Password:
                  <input type="password" onChange={this.handlePassword}/>
                </label>
              </div>
            </section><br />

            <section>
              <input type="radio" name="intro" onClick={this.setForm} value="signup" />Signup
              <input type="radio" name="intro" onClick={this.setForm} value="login" />Login
  					</section><br/>

            <input className="btn submit-btn" readOnly={true} type="Submit" value="Submit" onClick={this.handleSubmit}/><br/><br/>
            <input className="btn submit-btn" readOnly={true} type="Submit" value="Demo" onClick={this.handleDemo}/>
          </form>
        </div>
      )
    }
	},
	render: function(){
		return (
			<div id="login-form">
				{this.greeting()}
				{this.errors()}
				{this.form()}
			</div>
		);
	}
});

module.exports = LoginForm;
