class StaticPagesController < ApplicationController
  def home
    @top_users = User.order(id: :desc).all
  end

  def about
  end
end
