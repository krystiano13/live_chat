class Message < ApplicationRecord
  after_create_commit :broadcast_messages

  validates :text, presence: true
  validates :user, presence: true

  private

  def broadcast_messages
    MessageChannel.broadcast_to(self)
  end
end
