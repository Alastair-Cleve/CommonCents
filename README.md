# Common&#xFFE0;ents

[Heroku link][heroku] **NB:** This will be a link to my production site.

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Common&#xFFE0;ents is a web application inspired by TransferWise that will be built using Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Landing page with interactive widgets
- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an TransferWise-inspired site: exchange rates between selected currencies,  make a new transaction, and dashboard of past transactions
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

Common&#xFFE0;ents will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Interact with a landing page to discover Common&#xFFE0;ents’ offering
  - [ ] Currency conversion widget (&#x1F534; P1 - MVP)
  - [ ] Graph of exchange rates over past 30 days (&#x1F535; P2 - expected feature, but not MVP)
    - [ ] Links to competitor website via query string (&#x1F535; P2 - expected feature, but not MVP)
  - [ ] User reviews side-scrolling carousel (&#x1F535; P2 - expected feature, but not MVP)
  - [ ] Interactive map of supported countries with pulses simulating active transactions (&#x1F52E; P3 - stretch feature)
- [ ] Create an account (&#x1F534; P1 - MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (&#x1F534; P1 - MVP)
- [ ] Make a new transfer transaction in 3 basic steps: currency pair, sender’s details, receiver’s details  (&#x1F534; P1 - MVP)
  - [ ] Note: transaction is simulated only and not connected to any bank APIs
  - [ ] Confirmation screen with transaction summary (&#x1F535; P2 - expected feature, but not MVP)
  - [ ] Interactive breadcrumbs throughout transfer process (&#x1F52E; P3 - stretch feature)
- [ ] User dashboard with list of past transactions and ability to make a new transfer (&#x1F535; P2 - expected feature, but not MVP)
- [ ] Update account settings: update email, update password, default currency (&#x1F535; P2 - expected feature, but not MVP)
- [ ] Currency exchange rates connected to a live JSON API such Fixer.io, Open Exchange Rates (&#x1F52E; P3 - stretch feature)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `users` table
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/login pages
- [ ] blank dashboard page after login

### Phase 2: Currency Conversion widget (1.0 days)

**Objective:** Functioning currency conversion widget on landing page

- [ ] Set up basic APIUtil
- [ ] Set up Flux structure:
  - [ ] `Conversion` store
  - [ ] `Conversion` component
  - [ ] Client & Server Actions
- [ ] Implement fixer.io API
- [ ] Basic Styling

### Phase 3: Foreign Exchange 30-day graph (1.0 days)

**Objective:** Functioning 30-day exchange rate history

- [ ] Set up listener to Conversion store:
  - [ ] Listen for changes in `_fromCurrency` and `_toCurrency`
- [ ] Set up API interaction
- [ ] Chart creation with something like react-chartjs

### Phase 4: Customer Review Carrousel: Reviews Model & API (1.0 days)

**Objective:** Review carrousel is functioning

- [ ] create `reviews` table
- [ ] create `Review` model & populate with data
- [ ] implement index action on controller
- [ ] jBuilder view for index
- [ ] implement React component with react-slick

### Phase 5: Map Showing Customer Savings (1.0 days)

**Objective:** Map showing how much customers have saved is functioning

- [ ] create `savings` table
- [ ] create `savings` model & populate with data
- [ ] implement index action on controller
- [ ] jBuilder view for index
- [ ] implement React component showing a map with thumbtacks jumping
      around on the page showing how much people have saved
      **NB:** I could use some suggestions on how this would be rendered: see
      the TransferWise website for how it appears

### Phase 6: Create Navbar & User and Session Components (1.0 days)

**Objective:** Have working User and Session modals

- [ ] Create Navbar component
  - [ ] It should listen to the `Users` store
- [ ] It should contain links to Login, Demo, and Sign Up
  - [ ] These links have onClick event-listeners that cause the components
        to render as modals
- [ ] Implement full Flux pattern for these elements
  - [ ] They listen to the `Users` store and set the `_currentUser` variable
- [ ] Use `react-modal`

### Phase 7: Currency Transfer Component (1.0 days)

**Objective:** Implement a form where users can make currency transfers
**NB:** Rather than actually sending foreign currency, this will instead
populate the users's transfer history.

- [ ] Create transfers database table
- [ ] Create transfers model and controller
- [ ] Implement Flux architecture:
  - [ ] `Transfers` store
  - [ ] `_transfers` variable in `Transfers` store
- [ ] Set up as a single long page first and then implement bread crumb
      architecture later

### Phase 8: User Dashboard (1.0 days)

**Objective:** Have a functioning user dashboard

- [ ] Implement TransactionHistory component
  - [ ] This will be a list of FOREX transactions that the user has made organized
        by the date of the transaction
  - [ ] FLUX architecture will involve `GET /api/users/:id/transfers`
  - [ ] There will be a `Transfers` Store
  - [ ] `TransactionHistory` listens to the `Transfers` Store
- [ ] Nest the currency conversion widget into the component so that additional
      transfers can be made
- [ ] Implement basic password updating via `AccountSettings` component
  - [ ] `PATCH /api/users/:id`
  - [ ] AccountSettings listens to `Users` store
  - [ ] Implemented as a modal

### Phase 9: Additional CSS styling (0.5 days + all weekend if necessary)

**Objective:** Fix any styling issues

- [ ] Fix outstanding styling issues
- [ ] Indulge in other styling desires
