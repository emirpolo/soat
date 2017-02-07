class Tiposubtipo < ApplicationRecord
  scope :tarifas, -> (tipo, subtipo) {where('tipo_id =? AND subtipo_id = ?', tipo, subtipo)}
  scope :tarifas_edad, -> (tipo, subtipo, edad) {joins(:edad).where('tipo_id =? AND subtipo_id = ? AND ? >= de AND ? <= hasta', tipo, subtipo, edad, edad)}

  belongs_to :tipo
  belongs_to :subtipo
  belongs_to :edad
end
