json.set! :current_user do
  json.extract! @current_user, :username, :default_currency
end

json.set! :transfers do
  json.array! @current_user.transfers do |transfer|
    json.date "#{transfer.created_at.month}/#{transfer.created_at.day}/#{transfer.created_at.year}"
    json.time "#{transfer.created_at.hour < 10 ? "0" + transfer.created_at.hour.to_s : transfer.created_at.hour}" +
      ":#{transfer.created_at.min < 10 ? "0" + transfer.created_at.min.to_s : transfer.created_at.min}"
    json.recipient transfer.recipient.username
    json.amount number_with_precision(transfer.amount, :precision => 2, :delimiter => ',')
    json.extract! transfer, :id, :currency
  end
end

json.set! :received_transfers do
  json.array! @current_user.received_transfers do |transfer|
    json.date "#{transfer.created_at.month}/#{transfer.created_at.day}/#{transfer.created_at.year}"
    json.time "#{transfer.created_at.hour < 10 ? "0" + transfer.created_at.hour.to_s : transfer.created_at.hour}" +
      ":#{transfer.created_at.min < 10 ? "0" + transfer.created_at.min.to_s : transfer.created_at.min}"
    json.transferor transfer.transferor.username
    json.amount number_with_precision(transfer.amount, :precision => 2, :delimiter => ',')
    json.extract! transfer, :id, :currency
  end
end
