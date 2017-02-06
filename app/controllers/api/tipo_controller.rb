class Api::TipoController < ApplicationController
  def index
    render json: Tipo.all
  end

  def show
    render json: Tipo.find(params[:id])
  end
end
