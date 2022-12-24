Rails.application.routes.draw do
  get 'test/index', :controller => "test", :action => "index"

  root 'static_pages#home'

  get "/about", :controller => "static_pages", :action => "about"
  # devise_for :users
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }

  get '/users:id', to: 'users/profiles#show', as: :user_profile
  resources :games do
    resources :messages, only: :create
    member do
      patch :join
      put :join
      patch :forfeit
      put :forfeit
    end
  end
  resources :pieces, only: :update
  namespace :admin do

  end
end
