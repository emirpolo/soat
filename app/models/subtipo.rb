class Subtipo < ApplicationRecord
  has_many :tiposubtipos
  has_many :edads, through: :tiposubtipos
end
