class Api::EdadController < ApplicationController
  def index
    render json: Tipo.find(params[:tipo_id]).subtipos.find(params[:subtipo_id]).edads
  end
end
