class Api::SubtipoController < ApplicationController

  def index
    render json: Tipo.find(params[:tipo_id]).subtipos.distinct
  end

  def show
    render json: Tipo.find(params[:tipo_id]).subtipos.find(params[:id])
  end

  def tarifas
    edad =  params[:edad]
    if edad.to_i < 0
        render json: Tiposubtipo.tarifas(params[:tipo_id], params[:id])[0]
    else
        render json: Tiposubtipo.tarifas_edad(params[:tipo_id], params[:id], edad)[0]
    end
  end

end