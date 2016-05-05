# Common&#xFFE0;ents

[Heroku link][heroku]

[heroku]: https://commoncentsapp.herokuapp.com

## Minimum Viable Product

Common&#xFFE0;ents is a web application inspired by TransferWise that will be built using Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login, and guest/demo login
- [x] Smooth, bug-free navigation
- [x] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an TransferWise-inspired site: conversion widget to convert between selected currencies, an ability to make new FOREX transfers, a Navbar to navigate the site, and a dashboard of past transactions
- [x] Hosting on Heroku
- [x] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

Common&#xFFE0;ents will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Interact with a landing page to discover Common&#xFFE0;ents’ offering
  - [x] Currency conversion widget (&#x1F534; P1 - MVP)
  - [ ] Graph of exchange rates over past 30 days (&#x1F535; P2 - expected feature, but not MVP)
    - [ ] Links to competitor website via query string (&#x1F535; P2 - expected feature, but not MVP)
  - [ ] User reviews side-scrolling carousel (&#x1F535; P2 - expected feature, but not MVP)
  - [ ] Interactive map of supported countries with pulses simulating active transactions (&#x1F52E; P3 - stretch feature)
- [x] Create an account (&#x1F534; P1 - MVP)
- [x] Log in / Log out, including as a Guest/Demo User (&#x1F534; P1 - MVP)
- [x] Make a new transfer transaction in 3 basic steps: currency pair, sender’s details, receiver’s details  (&#x1F534; P1 - MVP)
  - [x] Note: transaction is simulated only and not connected to any bank APIs
  - [x] Confirmation screen with transaction summary (&#x1F535; P2 - expected feature, but not MVP)
  - [ ] Interactive breadcrumbs throughout transfer process (&#x1F52E; P3 - stretch feature)
- [x] User dashboard with list of past transactions and ability to make a new transfer (&#x1F534; P1 - expected feature, but not MVP)
- [ ] Update account settings: update email, update password, default currency (&#x1F52E; P3 - expected feature, but not MVP)
- [x] Currency exchange rates connected to a live JSON API such Fixer.io, Open Exchange Rates (&#x1F534; P1 - stretch feature)

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

### Phase 1: Backend setup and User Authentication (1.0 days)

**Objective:** Functioning rails project with front-end Authentication

- [x] Create new project
- [x] Create `users` table
- [x] Create `User` model
- [x] Create Flux architecture with Session store
- [x] User signup/login
- [x] `Default Currency` toggles on and off with `Login` and `Signup`
- [x] Implement a `Demo` user
- [x] Blank dashboard page after login
- [x] Add favicon: something with coins
- [x] Create modal for login/sign up
- [x] Implement basic styling for modal and open fade
- [ ] **Bonus!:** Animate demo login so that each letter is entered sequentially at 50ms

### Phase 2: Currency Conversion widget (1.5 days)

**Objective:** Functioning currency conversion widget on landing page

- [x] Set up basic APIUtil
- [x] Set up Flux structure:
  - [x] `Conversion` store
    - [x] `_base` & `_ratesObject` variables in `Conversion` store
  - [x] `Conversion` component
  - [x] `Conversion` Actions
- [x] Implement fixer.io API
- [x] Implement bi-directional inputs  
- [x] Basic Styling
- [ ] **Bonus!:** Prevent `fromCurrency` and `toCurrency` from being the same

### Phase 3: Foreign Currency Transfer Page (1.5 days)

**Objective:** Implement a form where users can make currency transfers
**NB:** Rather than actually sending foreign currency, this will instead
populate the users's transfer history.

- [x] Create transfers database table
- [x] Create transfers model and controller
- [x] Implement Flux architecture:
  - [x] `Transfers` store
  - [x] `_transfers` variable in `Transfers` store
- [x] Set up as a single long page first
  - [ ] **Bonus!** Implement bread crumb architecture later

### Phase 4: Create Navbar(1.0 days)

**Objective:** Have working Navbar with Login and Signup as links to modals

- [x] Create Navbar
- [x] It should contain links to Login, Demo, and Sign Up
  - [x] These links have onClick event-listeners that cause the components
        to render as modals
- [x] Use `react-modal`

### Phase 5: User Dashboard (1.0 days)

**Objective:** Have a functioning user dashboard

- [x] Show user's transaction history on their dashboard
  - [x] This will be a list of FOREX transactions that the user has made organized
        by the date of the transaction
  - [x] FLUX architecture will involve `GET /api/transfers` & `POST /api/transfers`
  - [x] There will be a `Transfers` Store
  - [x] `Dashboard` listens to the `Transfers` Store
- [x] Provide a link to the currency transfer process

### Phase 6: Additional CSS styling (1.0 days + all weekend if necessary)

**Objective:** Fix any styling issues

- [x] Fix outstanding styling issues
- [ ] Indulge in other styling desires
- [ ] Work on various other issues as they come up
  - [x] In progress

## Bonus features

### Phase 7: Foreign Exchange 30-day graph (1.0 days)

**Objective:** Functioning 30-day exchange rate history

- [ ] Set up listener to Conversion store:
  - [ ] Listen for changes in `_fromCurrency` and `_toCurrency`
- [ ] Set up API interaction
- [ ] Chart creation with something like react-chartjs
- [ ] Include a CSS Spinner while the graph loads

### Phase 8: Customer Review Carrousel: Reviews Model & API (1.0 days)

**Objective:** Review carrousel is functioning

- [ ] create `reviews` table
- [ ] create `Review` model & populate with data
- [ ] implement index action on controller
- [ ] jBuilder view for index
- [ ] implement React component with react-slick

### Phase 9: Map Showing Customer Savings (1.0 days)

**Objective:** Map showing how much customers have saved is functioning

- [ ] create `savings` table
- [ ] create `savings` model & populate with data
- [ ] implement index action on controller
- [ ] jBuilder view for index
- [ ] implement React component showing a map with thumbtacks jumping
      around on the page showing how much people have saved
      **NB:** I am not entirely clear how this will be implemented. I will be on
      the lookout for

### Phase 10: Password Updating (1.0 days)

**Objective:** Allow users to update their password

- [ ] Implement basic password updating via `AccountSettings` component
  - [ ] `PATCH /api/users/:id`
  - [ ] AccountSettings listens to `Users` store
  - [ ] Implemented as a modal
