# json.extract! @transfer, :transferor, :transferee, :amount, :currency

json.array! @transfers do |transfer|
  json.date "#{transfer.created_at.month}/#{transfer.created_at.day}/#{transfer.created_at.year}"
  json.time "#{transfer.created_at.hour}:#{transfer.created_at.min}"
  json.recipient transfer.recipient.username
  json.extract! transfer, :id, :amount, :currency
end
