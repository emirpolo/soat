class Vehiculo < ApplicationRecord
  belongs_to :tipo
  belongs_to :subtipo
  belongs_to :propietario
end
