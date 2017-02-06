class CreateEdads < ActiveRecord::Migration[5.0]
  def change
    create_table :edads do |t|
      t.integer :de
      t.integer :hasta

      t.timestamps
    end
  end
end
