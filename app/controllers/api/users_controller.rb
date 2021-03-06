class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      @errors = @user.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def show
    @users = User.all
    render "api/users/index"
  end

  private
  def user_params
    params.require(:user).permit(:username, :default_currency, :password)
  end
end
