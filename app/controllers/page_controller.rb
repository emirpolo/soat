class PageController < ApplicationController
  def index
    render file: Rails.public_path.join("index.html"), layout: true
  end

end
