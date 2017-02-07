class Api::VehiculoController < ApplicationController
  def show
    @vehiculo = Vehiculo.where(placa: params[:id]).last
    render json: @vehiculo
  end

  def create
    params.permit!

    @propietario = Propietario.find_by_doc(params[:propietario][:tipo_doc], params[:propietario][:doc])[0];

    if @propietario
      @propietario.update!(params[:propietario])
    else
      @propietario = Propietario.new(params[:propietario])
      @propietario.save
    end

    params[:vehiculo][:tipo] = Tipo.find(params[:vehiculo][:tipo])
    params[:vehiculo][:subtipo] = Subtipo.find(params[:vehiculo][:subtipo])
    params[:vehiculo][:propietario] = @propietario

    @vehiculo = Vehiculo.new(params[:vehiculo])
    @vehiculo.save

    render json: @vehiculo
  end

end
