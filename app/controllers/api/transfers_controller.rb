
class Api::TransfersController < ApplicationController

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
