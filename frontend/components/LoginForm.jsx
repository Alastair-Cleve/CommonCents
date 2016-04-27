var React = require("react");
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require("../actions/user_actions");
var UserStore = require('../stores/user_store');
// var CurrentUserState = require("../mixins/current_user_state");
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
    UserStore.addListener(this.updateUser);
    if (typeof UserStore.currentUser() === 'undefined') {
      UserActions.fetchCurrentUser();
    }
  },
  updateUser: function(){
    this.setState({
      currentUser: UserStore.currentUser(),
      userErrors: UserStore.errors()
    });
  },
	setForm: function(e){
		this.setState({form: e.target.value});
    if (this.state.form === "signup") {
      this.setState({show_currency: true})
    } else {
      this.setState({show_currency: false})
    }
	},
	handleSubmit: function(e){
    // debugger;
		e.preventDefault();
		UserActions[this.state.form]({
			username: this.state.username,
			password: this.state.password,
      default_currency: this.state.default_currency
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
				<h2>Hi, {this.state.currentUser.username}!</h2>
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
    // debugger;
		if (this.state.currentUser) {
			return;
		}
    if (this.state.show_currency) {
      return(
				<form onSubmit={this.handleSubmit}>
					<section>
						<label> Username:
							<input type="text" onChange={this.handleUsername}/>
						</label>

						<label> Password:
							<input type="password" onChange={this.handlePassword}/>
						</label>

            <label> Default Currency:
              <select onChange={this.handleDefaultCurrency} defaultValue="USD">
                {
                  currencies.map(function(currency, idx) {
                    return(<option key={idx} value={currency}>{currency}</option>)
                  })
                }
              </select>
            </label>
					</section>

					<section>
						<label> Login
							<input type="Radio" name="action" value="login" onChange={this.setForm}/>
						</label>

						<label> Sign Up
							<input type="Radio" name="action" value="signup" onChange={this.setForm}/>
						</label>
					</section>

					<input readOnly={true} type="Submit" value="Submit"/>
				</form>
      )
    } else {
       return(
        <form onSubmit={this.handleSubmit}>
          <section>
            <label> Username:
              <input type="text" onChange={this.handleUsername}/>
            </label>

            <label> Password:
              <input type="password" onChange={this.handlePassword}/>
            </label>
          </section>

          <section>
            <label> Login
              <input type="Radio" name="action" value="login" onChange={this.setForm}/>
            </label>

            <label> Sign Up
              <input type="Radio" name="action" value="signup" onChange={this.setForm}/>
            </label>
          </section>

          <input readOnly={true} type="Submit" value="Submit"/>
        </form>
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
