#Common&#xFFE0;ents

**[Live Site](https://commoncentsapp.herokuapp.com)**

##Concept

Common&#xFFE0;ents is a foreign currency transfer application that allows users to
send and receive foreign currency. Thirty-two currencies are supported, and users
can select a default currency when they create an account. On their dashboard, users
can view up-to-date rates for their default currency against other currencies.
Also from their dashboard, they can engage in the transfer process and view their
past transactions.

##Features

- Single Page App
- Front-End Authentication
  - Uses a modal architecture that gives users the choice of creating an account,
    logging in, or touring the site as a Demo User

    ![Signup_Screenshot](/docs/Signup.png)

- Conversion Widget
  - Connected to a third-party API that provides up-to-date exchange rates. The
    number fields update dynamically before users' eyes, and changes in the number
    and currency fields update other fields as necessary.
  - The `Make a Transfer` button forces the user to login or create an account
    and then re-directs the user to the Transfer process with the Transfer
    process fields pre-populated. (Alternatively, users can click `Log In/Sign In`
    at the top of the landing page.)

    ![Widget_Screenshot](/docs/Widget.png)







- Create, Read, Update, and Destroy Fundraisers
- Create, Read, and Update Donations
- Search Fundraisers by Title, Creator, and Category

##Technologies Used

- Front End
  - JavaScript
  - React.js
  - Flux
  - HTML5
  - CSS3
  - Sass
  - Bourbon
- Back End
  - Ruby on Rails
  - PostgreSQL
  - BCrypt

##To-Dos

- Prevent the user from selecting the same `fromCurrency` and `toCurrency` in
  the conversion widget
- Finish programming a graph on landing page that shows 30-day trend of currency
  pair in the conversion widget at the top of the page
  - Include a beautiful CSS spinner while the graph loads
- Implement a bread crumb architecture on the Transfers page
- Allow users to change their default currency
