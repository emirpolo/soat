class VehiculoSerializer < ActiveModel::Serializer
  attributes :id, :placa, :valor, :edad, :fecha_vigencia, :fecha_vencimiento, :tarifa

  belongs_to :tipo
  belongs_to :subtipo
  belongs_to :propietario

  def tarifa
    object.subtipo.tiposubtipos.first
  end
end
