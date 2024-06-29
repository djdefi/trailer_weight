# test_trailer_weight.rb

require './trailer_weight.rb'
require 'rspec'

RSpec.describe "TrailerWeightCalculator" do
  it "calculates max trailer weight correctly" do
    options = {
      max_weight: 1500,
      cargo: [200, 150, 50]
    }

    expected_gross_trailer_weight = ((options[:max_weight] - options[:cargo].sum) / 0.13).round

    # Redirect STDOUT to capture puts output
    expect { calculate_trailer_weight(options) }.to output(/Max towable gross trailer weight: #{expected_gross_trailer_weight}/).to_stdout
  end
end
