class VehiculoSerializer < ActiveModel::Serializer
  attributes :id, :placa, :valor, :edad, :fecha_vigencia, :fecha_vencimiento

  belongs_to :tipo
  belongs_to :subtipo
  belongs_to :propietario
end
