class Tipo < ApplicationRecord
  has_many :tiposubtipos
  has_many :subtipos, through: :tiposubtipos
end
