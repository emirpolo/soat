class CreateTipos < ActiveRecord::Migration[5.0]
  def change
    create_table :tipos do |t|
      t.string :tipo
      t.string :clase
      t.boolean :require_edad

      t.timestamps
    end
  end
end
