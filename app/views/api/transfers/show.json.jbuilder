# json.extract! @transfer, :transferor, :transferee, :amount, :currency

json.array! @transfers do |transfer|
  json.extract! transfer, :transferor_id, :transferee_id, :amount, :currency
end
