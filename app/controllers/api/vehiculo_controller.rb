class Api::VehiculoController < ApplicationController
    def show
        @vehiculo = Vehiculo.where(placa: params[:id]).last
        render json: @vehiculo
    end
end
