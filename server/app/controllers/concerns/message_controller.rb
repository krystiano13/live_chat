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
        @message = Message.new(get_message_params)
        if @message.save!
            render json: {
                :message => "Message Saved"
            }, status: :ok
        else
            render json: {
                :error => "Message was not saved"
            }, status: :unprocessable_entity
        end
    end

    private
    def get_message_params
        return params.require(:message).permit(:user, :text)
    end
end