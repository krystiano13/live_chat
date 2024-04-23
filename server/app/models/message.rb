class Message < ApplicationRecord
    validates :text, presence: true
    validates :user, presence: true
end
