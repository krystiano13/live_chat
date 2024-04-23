class MessageController < ApplicationController
    skip_before_action :verify_authenticity_token, raise: false  
    before_action :authenticate_devise_api_token!, :only => [:index, :create]

    def index
        @messages = Message.all
        render json: { 
            :messages => @messages
        }, status: :ok
    end

    def create

    end
end