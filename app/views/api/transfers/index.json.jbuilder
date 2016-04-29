json.array! @transfers do |transfer|
  json.extract! transfer, :transferor, :transferee, :amount, :currency
end
