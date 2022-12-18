class CreatePieces < ActiveRecord::Migration[7.0]
  def change
    create_table :pieces do |t|
      t.string "name"
      t.boolean "white"
      t.integer "x_coord"
      t.integer "y_coord"
      t.integer "game_id"
      t.integer "user_id"
      t.string "type"
      t.boolean "captured", default: false, null: false
      t.integer "move_number", default: 0
      t.integer "king_check", default: 0
      t.timestamps
    end
  end
end
