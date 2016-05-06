#Common&#xFFE0;ents

**[Live Site](https://commoncentsapp.herokuapp.com)**

##Concept

Common&#xFFE0;ents is a foreign currency transfer application that allows users to
send and receive foreign currency. Thirty-two currencies are supported, and users
can select a default currency when they create an account. On their dashboard, users
can view up-to-date rates for their default currency against other currencies.
Also from their dashboard, they can engage in the transfer process and view their
past transactions.

##Selected Features

- Single Page App
- Front-End Authentication
  - Uses a modal architecture that gives users the choice of creating an account,
    logging in, or touring the site as a Demo User.

    ![Signup_Screenshot](/docs/Signup.png)

- Conversion Widget
  - Connected to a third-party API that provides up-to-date exchange rates. The
    number fields update dynamically before users' eyes, and changes in the number
    and currency fields update other fields as necessary.
  - The `Make a Transfer` button forces the user to login or create an account
    and then re-directs the user to the Transfer process with the Transfer
    process fields pre-populated. (Alternatively, users can click `Log In/Sign In`
    at the top of the landing page and go directly to their dashboard.)

    ![Widget_Screenshot](/docs/Widget.png)

- Dashboard Sidebar
  - The user dashboard displays, *inter alia*, a sidebar that shows the day's current
    foreign exchange rates for the user's default currency. The sidebar is fixed on
    the DOM, is scrollable, and is always accessible through a hamburger icon.

    ![Dashboard_Screenshot](/docs/Dashboard.png)

  - The dashboard also shows the transaction history for the current user and includes
    links to log out and make a transfer.

- Dynamic Search
  - The Transfer process allows users to dynamically search for other users and
    includes helpful blue highlighting to indicate to the user where he or she
    is hovering.

    ![Search_Screenshot](/docs/Search.png)

  - The Search and Transfer process automatically update the user's transaction
    history.

- Other features
  - The application also displays many other features, including highlighting
    effects over certain elements, a logo icon in the upper left-hand corner that
    re-directs the user to the dashboard, and accessible, quick log-out.

##Technologies Used

- Front End
  - JavaScript
  - React.js
  - react-burger-menu
  - Flux
  - HTML5
  - CSS3
  - Fixer.io API
- Back End
  - Ruby on Rails
  - PostgreSQL
  - BCrypt

##Code Highlight

To make the conversion widget work properly, nested callbacks were used. For
example, when a user changes the amount in the `fromAmount` box (i.e., the
currency that the user is selling), a series of callbacks are triggered:

```javascript
handleFromAmount: function (e) {
  this.setState({fromAmount: e.target.value}, function() {
    var exchangeRate = this.state.ratesObject["rates"][this.state.toCurrency];
    var toAmount = this.state.fromAmount * exchangeRate;
    this.setState({toAmount: toAmount.toFixed(2)}, function() {
      ConversionActions.addToAmountToTransfersStore(this.state.toAmount);
    });
  });
},
```

First, the `fromAmount` that is stored in the component's state is updated.
However, since the React method `setState` is asynchronous, a callback is passed
to `setState` which calls another `setState` that updates the `toAmount` (i.e.,
the amount of the currency that the user is buying) after making the appropriate
calculation. Finally, once the `toAmount` is updated, another callback is passed,
which then triggers an action in `ConversionActions` to add the new `toAmount`
to the `ConversionsStore`. (This is done so that other components that listen
to the `ConversionsStore` can have access to the information that they need.) Similar
event handlers were used for the other fields in the conversion widget.

##To-Dos

- Prevent the user from selecting the same `fromCurrency` and `toCurrency` in
  the conversion widget
- Finish programming a graph on landing page that shows a 30-day trend of the
  currency pair in the conversion widget at the top of the page
  - Include a beautiful CSS spinner while the graph loads
- Implement a bread crumb architecture on the Transfers page
- Allow users to change their default currency
