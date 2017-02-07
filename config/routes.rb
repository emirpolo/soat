Rails.application.routes.draw do
  root 'page#index'

  namespace :api, defaults:{ format: :json }do
    resources :vehiculo
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