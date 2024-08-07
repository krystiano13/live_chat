Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get "api/message", to: "message#index", as: :message_all
  post "api/message", to: "message#create", as: :message_create
  put "api/message/:id", to: "message#update", as: :message_update
  delete "api/message/:id", to: "message#destroy", as: :message_destroy

  mount ActionCable.server => '/cable'
end
