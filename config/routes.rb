Rails.application.routes.draw do
  root 'page#index'

  get 'viewer/:id', to: 'api/vehiculo#pdf'

  namespace :api, defaults:{ format: :json }do
    resources :vehiculo
    get 'vehiculo/byid/:id', to: 'vehiculo#byid'
    resources :tipo do
      resources :subtipo do
        member do
            get 'tarifas/:edad', :action => 'tarifas'
        end
        resources :edad
      end
    end
  end
end