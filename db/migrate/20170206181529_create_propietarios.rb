class CreatePropietarios < ActiveRecord::Migration[5.0]
  def change
    create_table :propietarios do |t|
      t.string :tipo_doc
      t.integer :doc
      t.string :nombres
      t.string :apellidos
      t.string :email
      t.string :tel

      t.timestamps
    end
  end
end
