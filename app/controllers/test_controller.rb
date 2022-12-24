class TestController < ApplicationController
  def index
    @game = Game.find_by_id(22)
    @pieces = @game.pieces
  end
end
