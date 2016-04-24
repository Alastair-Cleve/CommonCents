# Flux Cycles

## Landing Page Cycles

### Navbar
**NB:** I am putting the Navbar here; however, if you consult my wireframes, you
will see that the Navbar appears in several places. Essentially, it will consult
the `Users` store's `_currentUser` variable to display the appropriate text.

If `_currentUser` is undefined, then, the Navbar will render `NewUser`, `DemoUser`,
and `ReturnUser` components. All that the Navbar will do is read the `_currentUser`
variable from the Users store. If `_currentUser` is defined, then it will render
an `AccountSettings` component. The Navbar will not need to issue Actions: it is
the components that it renders, such as `NewUser` which will issue a `createUser`
Client Action that will trigger a full Flux cycle.

(As an aside, you will see that my wireframes also include a Footer. This will be
static, non-changing content, so there will be no flux loops for that.)

### Currency Conversion
#### Currency Conversion API Request Actions
<!-- * `fetchFromCurrency` & `fetchToCurrency`
  0. invoked from `Conversion` `didMount`/`onClick` event-handlers
  0. `GET /api...FromCurrency` and `GET /api/...ToCurrency` are called
  0. `receiveFromCurrency` & `receiveToCurrency` are set at the callbacks -->

* `fetchFromAmount` & `fetchToAmount`
  0. invoked from `Conversion` `didMount`/`onClick` event-handlers
  0. `GET /api...FromAmount` and `GET /api...ToAmount` are called
  0. `receiveFromAmount` & `receiveToAmount` are set at the callbacks

**NB:** I'd like to discuss this section and the following section (Graph) with my PM.
The basic idea is this: I will extract the From-currency and the To-currency from
dropdown menus that show supported currencies. Then, the user will type in an
amount in the `FromAmount` box or the `ToAmount` box, which are adjacent to the
From-currency and To-currency. This event will trigger the component make a
call to the fixer.io API, which is an exchange-rate API. Thus, if a user selected
EUR as the From-currency, USD as the To-currency, and &#x20AC;1,000 as the
FromAmount, the Conversion widget will populate the ToAmount with the correct figure:
  1. First, a GET call to http://api.fixer.io/latest
     This will provide the current exchange rates. The default base currency is EUR.
  2. Then, the exchange rate against the To-Currency will be extracted, i.e.
     data.rates.USD. In this case, this provides 1.1263, i.e. &#x20AC;1 = $1.1263.
  3. Once I have the rate, the To-amount can be calculated: 1000 x 1.1263 = $1,126.
     This rate will then populate the To-Amount box.
Basically, is this the way I should do it: with a full flux loop and a Conversion
store that holds `_fromAmount` and `_toAmount`?

#### Currency Conversion API Response Actions
<!-- * `receiveFromCurrency` & `receiveToCurrency`
  0. invoked as API callbacks
  0. `Conversion` store updates `_fromCurrency` and `_toCurrency` and emits change -->

* `receiveFromAmount` & `receiveToAmount`
  0. invoked as API callbacks
  0. `Conversion` store updates `_fromAmount` and `_toAmount` and emits change

#### Store Listeners
* `Currency` component listens to `Conversion` store

### Foreign Exchange 30-Day History Graph
#### Graph API Request Actions
* Essentially a forex API call is made for the information in the graph.
* I plan to use fixer.io. For example, we can get rates on a given day with:
  0. http://api.fixer.io/2001-01-03
  0. **NB:** I'd like some clarity on where this fits into the Flux loop.
  0. I don't think that I'd want to store this information in my database.
  0. However, I recognize that making 30-days' worth of API calls will likely
     be time consuming.

#### Graph API Response Actions
* The graph is rendered

#### Store Listeners
* `Graph` component listens to `Conversion` store as well

### Customer Review Carousel
#### ReviewIndex API Request Actions
* `fetchAllReviews`
  0. invoked from `ReviewIndex` `didMount`
  0. `GET /api/reviews` is called
  0. `receiveAllReviews` is set as the callback

#### ReviewIndex API Response Actions
* `receiveAllReviews`
  0. invoked from an API callback
  0. `Review` store updates `_reviews` and emits change

#### Store Listeners
* `ReviewIndex` component listens to `Review` store

### Map Showing Customer Savings
#### Map API Request Actions
* `fetchAllSavings`
  0. invoked from `Map` `didMount`
  0. `GET /api/savings` is called
  0. `receiveAllSavings` is set as the callback

#### Map API Response Actions
* `receiveAllSavings`
  0. invoked from an API callback
  0. `Savings` store updates `_savings` and emits change

#### Store Listeners
* `Map` component listens to `Savings` store

## New User Page Cycles
**NB:** My intention is to make signing up and logging in React modals.

### User Component
#### User Request Actions
* `createUser`
  0. invoked from new user button `onClick`
  0. `POST /api/users` is called
  0. `receiveSingleUser` is set as callback

#### User Response Actions
* `receiveSingleUser`
  0. invoked from an API callback
  0. `Users` store updates `_currentUser` and emits change

#### Store Listeners
* `User` component listens to `Users` store

## Login Page Cycles

### New Session Component
#### New Session Request Actions
* `createSession`
  0. invoked from Log In button `onClick`
  0. `POST /api/session` is called
  0. `receiveSingleUser` is set as callback

#### Session Response Actions
* `receiveSingleUser`
  0. invoked as an API callback
  0. `Users` store updates `_currentUser` and emits change

#### Store Listeners
* `Session` component listens to `Users` store

## New Currency Transfer Page Cycles

### Transfer Component
#### Transfer Confirmation Request Actions
* `createTransfer`
  0. invoked from Transfer button `onClick`
  0. `POST /api/transfers` is called
  0. `receiveSingleTransfer` is set as callback

#### Transfer Confirmation Response Actions
* `receiveSingleTransfer`
  0. invoked as an API callback
  0. `Transfers` store updates `_transfers` and emits change

#### Store Listeners
* `TransferConfirmation` component listens to `Transfers` store

**NB:** The point of keeping track of a users' transfer history is so that it can
be shown on their dashboard when they log in. The Demo user will come seeded with
transfer data so that this feature can be highlighted. Further, when someone
makes a transfer, a real financial transaction will not happen; instead, the
`_transfers` will update so that the user's transfer history on their dashboard
updates as well.

## User Dashboard Page Cycles

### Transaction History Component
#### Transaction History Request Actions
* `fetchUserTransactions`
  0. invoked from `didMount`
  0. `GET /api/users/:id/transfers` is called
  0. `receiveUserTransactions` is set as callback

#### Transaction History Response Actions
* `receiveUserTransactions`
  0. invoked as an API callback
  0. `Transfers` store updates `_transfers` and emits change

#### Store Listeners
* `TransactionHistory` component listens to `Transfers` store

### Account Settings Request Actions
#### Account Settings Request Actions
* `updateUserPassword`
  0. invoked from Save `onClick`
  0. `PATCH /api/users/:id` is called
  0. `receiveSingleUser` is set as callback

#### Account Settings Response Actions
* `receiveSingleUser`
  0. invoked as an API callback
  0. `Users` store updates `_currentUser` and emits change

#### Store Listeners
* `AccountSettings` component listens to `Users` store
