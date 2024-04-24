class Message < ApplicationRecord
  after_create_commit { broadcast_messages }

  validates :text, presence: true
  validates :user, presence: true

  private
  def broadcast_messages
    messages = Message.all
    ActionCable.server.broadcast("messages_channel", { :messages => messages })
  end
end
