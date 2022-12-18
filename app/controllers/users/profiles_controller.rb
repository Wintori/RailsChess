# frozen_string_literal: true

class Users::ProfilesController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
end

