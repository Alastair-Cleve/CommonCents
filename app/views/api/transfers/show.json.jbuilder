# json.extract! @transfer, :transferor, :transferee, :amount, :currency

json.array! @transfers do |transfer|
  json.date "#{transfer.created_at.month}/#{transfer.created_at.day}/#{transfer.created_at.year}"
  json.time "#{transfer.created_at.hour < 10 ? "0" + transfer.created_at.hour.to_s : transfer.created_at.hour}" +
    ":#{transfer.created_at.min < 10 ? "0" + transfer.created_at.min.to_s : transfer.created_at.min}"
  json.recipient transfer.recipient.username
  json.amount number_with_precision(transfer.amount, :precision => 2, :delimiter => ',')
  json.extract! transfer, :id, :currency
end
