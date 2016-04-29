class Transfer < ActiveRecord::Base

  validates :transferor_id, :transferee_id, :amount, presence: true

  belongs_to(
    :transferor,
    class_name: 'User',
    foreign_key: :transferor_id,
    primary_key: :id
  )

  belongs_to(
    :recipient,
    class_name: 'User',
    foreign_key: :transferee_id,
    primary_key: :id
  )

end
