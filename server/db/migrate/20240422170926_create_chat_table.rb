class CreateChatTable < ActiveRecord::Migration[7.1]
  def change
    create_table :chat_tables do |t|
      t.text :text
      t.string :user

      t.timestamps
    end
  end
end
