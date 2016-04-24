# Flux Cycles

## Landing Page Cycles

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

#### Currency Conversion API Response Actions
<!-- * `receiveFromCurrency` & `receiveToCurrency`
  0. invoked as API callbacks
  0. `Conversion` store updates `_fromCurrency` and `_toCurrency` and emits change -->

* `receiveFromAmount` & `receiveToAmount`
  0. invoked as API callbacks
  0. `Conversion` store updates `_fromAmount` and `_toAmount` and emits change

### Foreign Exchange 30-Day History Graph
#### Graph API Request Actions
* Essentially a forex API call is made for the information in the graph.
* I plan to use fixer.io. For example, we can get the latest USD Forex rates with
  0. http://api.fixer.io/latest?base=USD
  0. **NB** I'd like some clarity on where this fits into the Flux loop.
  0. I don't think that I'd want to store this information in my database.

#### Graph API Response Actions
* The graph is rendered

#### Store Listeners
* `Currency` component listens to `Conversion` store
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

## New Transfer Page Cycles

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
