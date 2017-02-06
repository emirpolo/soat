Rails.application.routes.draw do
  root 'page#index'

  namespace :api, defaults:{ format: :json }do
    resources :vehiculo
    resources :tipo do
      resources :subtipo do
        resources :edad
      end
    end
  end
end