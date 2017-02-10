class Api::VehiculoController < ApplicationController
  include ActionController::MimeResponds
  include ActionView::Helpers::NumberHelper

  def index
    render json: Vehiculo.list.to_json
  end

  def show
    render json: Vehiculo.where(placa: params[:id]).last
  end

  def byid
    render json: Vehiculo.find(params[:id])
  end

  def pdf
    @vehiculo = Vehiculo.find(params[:id])
    html = ERB.new(File.open("#{Rails.root}/app/views/pdf/detalle_compra.html.erb").read).result(binding)
    begin
      respond_to do |format|
        format.pdf do
          send_data WickedPdf.new.pdf_from_string(html), filename: 'products.pdf', type: 'application/pdf', disposition: 'inline'
        end
      end
    end
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
