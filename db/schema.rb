# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170204164020) do

  create_table "edads", force: :cascade do |t|
    t.integer  "de"
    t.integer  "hasta"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subtipos", force: :cascade do |t|
    t.string   "subtipo"
    t.integer  "min"
    t.integer  "max"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tipos", force: :cascade do |t|
    t.string   "tipo"
    t.string   "clase"
    t.boolean  "require_edad"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "tiposubtipos", force: :cascade do |t|
    t.integer  "tipo_id"
    t.integer  "subtipo_id"
    t.integer  "edad_id"
    t.decimal  "tasa_co"
    t.decimal  "tasa_runt"
    t.decimal  "valor_prima"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["edad_id"], name: "index_tiposubtipos_on_edad_id"
    t.index ["subtipo_id"], name: "index_tiposubtipos_on_subtipo_id"
    t.index ["tipo_id"], name: "index_tiposubtipos_on_tipo_id"
  end

end
