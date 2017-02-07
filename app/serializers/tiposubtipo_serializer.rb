class TiposubtipoSerializer < ActiveModel::Serializer
  attributes :id, :tasa_co, :tasa_runt, :valor_prima

  belongs_to :edad
end
