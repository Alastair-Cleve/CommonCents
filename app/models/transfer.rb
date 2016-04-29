class Transfer < ActiveRecord::Base

  validates :transferor, :transferee, :amount, presence: true

  belongs_to(
    :transferor,
    class_name: 'User',
    foreign_key: :transferor,
    primary_key: :id
  )

end
