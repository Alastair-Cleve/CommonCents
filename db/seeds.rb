# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require('faker')

currencies = ["EUR", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK",
"DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW",
"MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD",
"THB", "TRY", "USD", "ZAR"]

User.create!(username: "guest", password: "password", default_currency: "USD")

24.times do
  User.create!(username: Faker::Internet.user_name,
               password: Faker::Internet.password,
               default_currency: currencies.sample)
end

5.times do
  Transfer.create!(transferor_id: 1,
                   transferee_id: (1..25).to_a.sample,
                   amount: rand(1000..5000) + rand(),
                   currency: currencies.sample)
end
