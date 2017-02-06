class CreateVehiculos < ActiveRecord::Migration[5.0]
  def change
    create_table :vehiculos do |t|
      t.string :placa
      t.references :tipo, foreign_key: true
      t.references :subtipo, foreign_key: true
      t.decimal :valor
      t.integer :edad
      t.date :fecha_vigencia
      t.date :fecha_vencimiento
      t.references :propietario, foreign_key: true

      t.timestamps
    end
  end
end
