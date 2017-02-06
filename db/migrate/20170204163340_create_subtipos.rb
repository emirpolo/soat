class CreateSubtipos < ActiveRecord::Migration[5.0]
  def change
    create_table :subtipos do |t|
      t.string :subtipo
      t.integer :min
      t.integer :max

      t.timestamps
    end
  end
end
