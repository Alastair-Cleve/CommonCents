class Api::TransfersController < ApplicationController

  def index
    @transfers = current_user.transfers
    render "api/transfers"
  end

  def create
    @transfer = User.new(transfer_params)
    if @transfer.save
      render "api/transfers"
    else
      @erros = @transfer.errors.full_messages
      render "api/shared/error", status: 401
    end
  end

  def show
    @transfer = Transfer.find(:id)
    render "api/transfers/show"
  end

  private
  def transfer_params
    params.require(:transfer).permit(:transferor, :transferee, :amount, :currency)
  end

end
