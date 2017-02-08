class Vehiculo < ApplicationRecord
  scope :list, -> {select('vehiculos.id', 'propietarios.nombres', 'placa', 'fecha_vencimiento', 'created_at', 'apellidos', 'tipo_doc', 'doc').joins(:propietario)}

  belongs_to :tipo
  belongs_to :subtipo
  belongs_to :propietario
end
