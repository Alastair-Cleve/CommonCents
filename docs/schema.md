# Schema Information

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
body        | text      | not null

## savings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
amount      | integer   | not null
longitude   | integer   | not null
latitude    | integer   | not null

## transfers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
transferor  | integer   | not null, foreign key (references users), indexed
transferee  | integer   | not null, foreign key (references users), indexed
amount      | integer   | not null
currency    | string    | not null

## users
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
username         | string    | not null, indexed, unique
default_currency | string    | not null
password_digest  | string    | not null
session_token    | string    | not null, indexed, unique
