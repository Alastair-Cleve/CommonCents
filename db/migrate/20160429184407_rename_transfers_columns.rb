class RenameTransfersColumns < ActiveRecord::Migration
  def change
    rename_column :transfers, :transferor, :transferor_id
    rename_column :transfers, :transferee, :transferee_id
  end
end
