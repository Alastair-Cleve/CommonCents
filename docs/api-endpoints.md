# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

<!-- ### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session` -->

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users/:id`

### Session

- `POST /api/session`
- `DELETE api/session`

### Reviews

- `GET /api/reviews`
  - This populates the Reviews carousel. May add a feature to create a review,
    but that would be a stretch goal.

### Savings

- `GET /api/savings`
  - This populates the Map showing customer savings. I intend to hard-code this,
    and the `Map` component will cause this request to be made. **NB:** I've thought
    about collapsing this information into the `transfers` table. Should I do this?

### Transfers

- `POST /api/user/:id/transfers`
   - This call is made when the user submits a currency transfer request.
- `GET /api/users/:id/transfers`
   - This call is made to list the user's past currency transfers on the dashboard.
