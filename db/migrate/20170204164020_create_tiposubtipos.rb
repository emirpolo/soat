class CreateTiposubtipos < ActiveRecord::Migration[5.0]
  def change
    create_table :tiposubtipos do |t|
      t.references :tipo, foreign_key: true
      t.references :subtipo, foreign_key: true
      t.references :edad, foreign_key: true
      t.decimal :tasa_co
      t.decimal :tasa_runt
      t.decimal :valor_prima

      t.timestamps
    end
  end
end
