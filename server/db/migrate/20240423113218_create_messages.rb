class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.text :text
      t.string :user

      t.timestamps
    end
  end
end
