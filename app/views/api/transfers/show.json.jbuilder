# json.extract! @transfer, :transferor, :transferee, :amount, :currency

json.array! @transfers do |transfer|
  json.recipient transfer.recipient.username
  json.extract! transfer, :amount, :currency
end
