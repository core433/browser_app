require 'spec_helper'

describe "StaticPages" do

  describe "Static pages" do

  	describe "Home page" do

  		it "should have the content 'Browser App'" do
  			visit root_path
  			page.should have_content('Browser App')
  		end
  	end
  	
  end

end
