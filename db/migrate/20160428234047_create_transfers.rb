class CreateTransfers < ActiveRecord::Migration
  def change
    create_table :transfers do |t|
      t.integer :transferor, null: false
      t.integer :transferee, null: false
      t.integer :amount, null: false

      t.timestamps null: false
    end

    add_index :transfers, :transferor
    add_index :transfers, :transferee
  end
end
