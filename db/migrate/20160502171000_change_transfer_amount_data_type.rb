class ChangeTransferAmountDataType < ActiveRecord::Migration
  def change
    change_column :transfers, :amount, :float
  end
end
