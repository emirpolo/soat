class Tiposubtipo < ApplicationRecord
  belongs_to :tipo
  belongs_to :subtipo
  belongs_to :edad
end
