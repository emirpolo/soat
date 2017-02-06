# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
edades = Edad.create(de: 0, hasta: 0)
edades_1 = Edad.create(de: 0, hasta: 9)
edades_2 = Edad.create(de: 10, hasta: 9999)
tipo = Tipo.create(tipo: 'MOTOS', clase: 'CILINDRAJE', require_edad: false)
subtipo = Subtipo.create(subtipo: 'Menos de 100 c.c.', min: 0, max: 99)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades, tasa_co: 8.26, tasa_runt: 1610, valor_prima: 203100)
subtipo = Subtipo.create(subtipo: 'De 100 a 200 c.c.', min: 100, max: 200)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades, tasa_co: 11.09, tasa_runt: 1610, valor_prima: 272700)
subtipo = Subtipo.create(subtipo: 'Más de 200 c.c.', min: 201, max: 999)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades, tasa_co: 12.51, tasa_runt: 1610, valor_prima: 307600)
subtipo = Subtipo.create(subtipo: 'MOTOCARROS', min: 0, max: 999)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades, tasa_co: 12.51, tasa_runt: 1610, valor_prima: 307600)

tipo = Tipo.create(tipo: 'CAMPEROS Y CAMIONETAS', clase: 'CILINDRAJE', require_edad: true)
subtipo = Subtipo.create(subtipo: 'Menos de 1500 c.c.', min: 0, max: 1499)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_1, tasa_co: 13.29, tasa_runt: 1610, valor_prima: 326800)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_2, tasa_co: 15.99, tasa_runt: 1610, valor_prima: 393200)
subtipo = Subtipo.create(subtipo: '1500 a 2500 c.c.', min: 1500, max: 2500  )
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_1, tasa_co: 15.88, tasa_runt: 1610, valor_prima: 390400)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_2, tasa_co: 18.82, tasa_runt: 1610, valor_prima: 462700)
subtipo = Subtipo.create(subtipo: 'Más de 2500 c.c.', min: 2501, max: 9999  )
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_1, tasa_co: 18.63, tasa_runt: 1610, valor_prima: 458100)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_2, tasa_co: 21.39, tasa_runt: 1610, valor_prima: 525900)

tipo = Tipo.create(tipo: 'CARGA O MIXTOS', clase: 'TONELADAS', require_edad: false)
subtipo = Subtipo.create(subtipo: 'Menos de 5 ton', min: 0, max: 4)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_2, tasa_co: 14.90, tasa_runt: 1610, valor_prima: 366300)
subtipo = Subtipo.create(subtipo: 'De 5 a 15 ton', min: 5, max: 15)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_2, tasa_co: 21.53, tasa_runt: 1610, valor_prima: 592400)
subtipo = Subtipo.create(subtipo: 'Más de 15 ton', min: 16, max: 9999)
tiposubtipo = Tiposubtipo.create(tipo: tipo, subtipo: subtipo, edad: edades_2, tasa_co: 27.23, tasa_runt: 1610, valor_prima: 669600)

