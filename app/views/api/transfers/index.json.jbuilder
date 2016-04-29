# Not currently using. Index method is not currently available. 

json.array! @transfers do |transfer|
  json.extract! transfer, :transferor, :transferee, :amount, :currency
end
