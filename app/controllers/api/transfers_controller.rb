
class Api::TransfersController < ApplicationController

#Rethink controller architecture: remember that you do not have an index action.
  # def index
  #   @transfers = current_user.transfers
  #   render "api/transfers"
  # end

  def create
    @transfer = Transfer.new(transfer_params)
    if @transfer.save
      @transfers = current_user.transfers
      render "api/transfers/show"
    else
      @errors = @transfer.errors.full_messages
      render "api/shared/error", status: 401
    end
  end

  def show
    @current_user = current_user
    # @transfers = current_user.transfers
    # if @transfers
    if @current_user
      render "api/transfers/show"
    else
      render "[]"
    end
  end

  private
  def transfer_params
    params.require(:transfer).permit(:transferor_id, :transferee_id, :amount, :currency)
  end

end
