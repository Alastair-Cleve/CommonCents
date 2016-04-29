class AddColumnToTransfers < ActiveRecord::Migration
  def change
    add_column :transfers, :currency, :string, null: false
  end
end
