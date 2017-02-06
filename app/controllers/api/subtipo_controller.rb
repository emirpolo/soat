class Api::SubtipoController < ApplicationController

  def index
    render json: Tipo.find(params[:tipo_id]).subtipos.distinct
  end

  def show
    render json: Tipo.find(params[:tipo_id]).subtipos.find(params[:id])
  end

end