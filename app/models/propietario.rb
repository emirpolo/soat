class Propietario < ApplicationRecord
    scope :find_by_doc, -> (tipo, doc) {where(tipo_doc: tipo, doc: doc)}
    has_many :vehiculo
end